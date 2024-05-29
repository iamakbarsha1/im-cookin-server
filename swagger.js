const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "imcookin",
      description:
        "API enpoints documented on the swagger for the imcookin server!",
      contact: {
        name: "Akbarsha",
        email: "iamakbarsha1@gmail.com",
        url: "https://github.com/iamakbarsha1/im-cookin-server",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://locahost:7000/",
        description: "local server",
      },
      {
        url: "<live server link>",
        description: "live server",
      },
    ],
  },
  apis: ["./router/*.js"], // looks for configuration in specified directories
};

const swaggerSpec = swaggerJSDoc(options);

exports.swaggerDocs = (app, port) => {
  // swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //   Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "applciation/json");
    res.send(swaggerSpec);
  });
};
