const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/user.model");
const { generateToken } = require("../helpers/token");

exports.oauth = async (req, res) => {
  try {
    const token = req.body.credential;
    const decoded = jwt.decode(token);

    if (
      decoded.iss.includes("google") &&
      decoded.azp.includes("googleusercontent") &&
      decoded.aud.includes("googleusercontent")
    ) {
      decoded.OAuthType = "google";
    } else {
      decoded.OAuthType = "github";
    }

    const email = decoded.email;

    const dbRes = await User.findOne({ email: email });

    if (dbRes !== null) {
      try {
        await User.updateOne(
          { email: email },
          { $set: { loginCount: dbRes.loginCount + 1 } }
        );
        return res.status(200).json({
          code: 200,
          description: "Existing User, Login count Incremented!",
        });
      } catch (err) {
        return res.status(500).json({
          code: 500,
          key: "Error",
          description: "Error - @POST/oauth - Existing User",
        });
      }
    } else {
      try {
        const newUser = new User({
          username: decoded.email,
          email: email,
          name: decoded.name,
          OAuthProfiles: decoded,
          OAuthTypes: decoded.OAuthType,
          loginCount: 1,
        });

        const dbRes2 = await newUser.save();
        return res.status(201).json({
          code: 201,
          data: dbRes2,
          description: "New user created!",
        });
      } catch (err) {
        return res.status(500).json({
          code: 500,
          key: "Error",
          description: "Error - @POST/oauth - New User",
        });
      }
    }
  } catch (err) {
    console.error("Error", err);
    return res.status(500).json({
      code: 500,
      key: "Error",
      error: err.toString(),
      description: "Error - @POST/oauth",
    });
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, username, email, password, dob } = req.body;

  try {
    const [emailUnique, usernameUnique] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);

    // Validate the existing email
    if (emailUnique) {
      return res.status(400).json({
        code: 400,
        description: "Email already exists!",
      });
    }

    // Validate the existing username
    if (usernameUnique) {
      return res.status(400).json({
        code: 400,
        description: "Username already exists!",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password, // This will be hashed by the pre-save hook
      dob,
    });
    const savedUser = await newUser.save();

    return res.status(201).json({
      code: 201,
      // data: savedUser,
      description: "New user created!",
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      key: "Error",
      error: err.toString(),
      description: "Error creating new user - @POST/register",
    });
  }
};

exports.login = async (req, res) => {
  const { emailUsername, password } = req.body;

  console.log("req -> ", req.cookies);
  try {
    const [isEmailExist, isUsernameExist] = await Promise.all([
      User.findOne({ email: emailUsername }),
      User.findOne({ username: emailUsername }),
    ]);

    let user =
      isEmailExist !== null
        ? isEmailExist
        : isUsernameExist !== null
        ? isUsernameExist
        : null;

    // let user = null;

    // if (isEmailExist) {
    //   user = isEmailExist;
    // } else if (isUsernameExist) {
    //   user = isUsernameExist;
    // }
    if (user) {
      if (!user.password) {
        return res.status(500).json({
          code: 500,
          key: "Error",
          description: "Invalid credentials!",
        });
      }

      // Validate the password using callback style
      bcrypt.compare(password, user.password, function (err, isPasswordValid) {
        if (err) {
          return res.status(500).json({
            code: 500,
            key: "Error",
            description: "Error validating credentials",
          });
        }

        console.log("isPasswordValid -> " + isPasswordValid);

        if (!isPasswordValid) {
          return res.status(401).json({
            code: 401,
            key: "Error",
            description: "Oops! Invalid credentials",
          });
        }

        // Proceed with login count update and response
        const loginCount = isNaN(user.loginCount) ? 0 : user.loginCount;

        // Generate jwt token
        const token = generateToken(user);

        User.updateOne(
          { _id: user._id },
          { $set: { loginCount: loginCount + 1, token: token } }
        )
          .then(() => {
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).json({
              code: 200,
              description: `Hello ${user.firstName}!`,
              token: token,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              code: 500,
              key: "Error",
              error: err.toString(),
              description: "Error in updating login count",
            });
          });
      });
    } else {
      return res.status(404).json({
        code: 404,
        key: "Error",
        description: "User not found!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      key: "Error",
      error: err.toString(),
      description: "Error in user login",
    });
  }
};
