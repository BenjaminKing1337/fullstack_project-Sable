const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// create out express app
const app = express();



// UNCOMMENT WHEN SWAGGER AND YAML HAS BEEN INSTALLED AND SETUP
// swagger deps
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
// setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// dot-env dep
require("dotenv-flow").config();


// Handle CORS + middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  ); // If using .fetch and not axios
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// database connection
mongoose
  .connect(process.env.DBHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB:" + error));
mongoose.connection.once("open", () =>
  console.log("Successfully connected to MongoDB")
);

app.use(bodyParser.json());

// _ROUTES_ //
// standard GET
// app.get("/", (res, req) => {
//   res.send("yay homepage");
// });

// Import task routes
const TasksRoute = require("./routes/Tasks");
app.use("/tasks", TasksRoute);

// Import user routes
const UserRoute = require("./routes/Users");
app.use("/users", UserRoute);

app.use(express.json());


// port
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log("Listening at port 4000");
});

module.exports = app;
