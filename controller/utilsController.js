const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.status = (req, res) => {
  return res.status(200).json({
    code: 200,
    Status: "Good!",
    reqData: req.body,
  });
};

// {
//   iss: 'https://accounts.google.com',
//   azp: '273165941736-ks9r28b7vecnmkc5n2ht3kcoesl76ppj.apps.googleusercontent.com',
//   aud: '273165941736-ks9r28b7vecnmkc5n2ht3kcoesl76ppj.apps.googleusercontent.com',
//   sub: '117196729982985375994',
//   email: 'iamakbarsha1@gmail.com',
//   email_verified: true,
//   nbf: 1713034044,
//   name: 'Akbar Sha S',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocI9rVwcsWrMWEwgFZeXN-HnjP6aWiQqyhp3Uzw3QweuYTSyTyo=s96-c',
//   given_name: 'Akbar Sha',
//   family_name: 'S',
//   iat: 1713034344,
//   exp: 1713037944,
//   jti: '956b566443d37e48dffa487e14f87f627a7998a1'
// }

exports.oauth = (req, res) => {
  // console.log("REQQQ --> ", req.body);

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

  User.findOne({ email: email })
    .then((dbRes) => {
      if (dbRes !== null) {
        User.updateOne(
          { email: email },
          { $set: { loginCount: dbRes.loginCount + 1 } }
        )
          .then((dbRes2) => {
            return res.status(200).json({
              code: 200,
              // data: dbRes,
              description: "Existing User, Login count Incremented!",
            });
          })
          .catch((err) => {
            res.json({
              key: "Error",
              description: "Error - @POST/oauth - Existing User",
            });
          });
      } else {
        User({
          username: decoded.email,
          email: email,
          name: decoded.name,
          OAuthProfiles: decoded,
          OAuthTypes: decoded.OAuthType,
          loginCount: 1,
        })
          .save()
          .then((dbRes) => {
            return res.status(201).json({
              code: 201,
              data: dbRes,
              description: "New user created!",
            });
          })
          .catch((err) => {
            res.json({
              key: "Error",
              description: "Error - @POST/oauth - New User",
            });
          });
      }
    })
    .catch((err) => {
      console.error("Error", err);
      res.json({
        key: "Error",
        error: err.toString(),
        description: "Error - @POST/oauth",
      });
    });
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
