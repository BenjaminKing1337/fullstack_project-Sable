// importing model and deps
const Router = require("express").Router();
const User = require("../models/Users");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
//importing validations
const {
  RegisterValidation,
  LoginValidation,
  VerifyToken,
} = require("../validation");
// const { Application } = require("express");
// ROUTE - /registration
Router.post("/register", async (req, res) => {
  // validate user input
  const { error } = RegisterValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // check if the email is already registered
  const EmailExist = await User.findOne({ email: req.body.email });

  if (EmailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // hash the password
  const Salt = await Bcrypt.genSalt(10);
  const Pass = await Bcrypt.hash(req.body.pass, Salt);

  // create User object and save in db
  const UserObject = new User({
    name: req.body.name,
    email: req.body.email,
    pass: Pass,
  });

  try {
    const SavedUser = await UserObject.save();
    res.json({ error: null, data: SavedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }

  // test Register route
  // return res.status(200).json({ msg: "Register route..." });
});
// ROUTE - /login
Router.post("/login", async (req, res) => {
  // validate User login info
  const { error } = LoginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // if login info is valid, find the User
  const user = await User.findOne({ email: req.body.email });

  // throw error if email is wrong (User does not exist in DB)
  if (!user) {
    return res.status(400).json({ error: "Email is wrong" });
  }

  // User exists - check for password correctness
  const ValidPass = await Bcrypt.compare(req.body.pass, user.pass);

  // throw errror if password is incorrect
  if (!ValidPass) {
    return res.status(400).json({ error: "Password is wrong" });
  }

  // create auth token with username and id
  const Token = Jwt.sign(
    //payload
    {
      name: user.name,
      email: user.email,
      userLevel: user.userLevel,
      id: user._id,
    },
    // TOKEN_SECRET
    process.env.TOKEN_SECRET,
    // EXPIRATION TIME
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // attach auth token to header
  res.header("auth-token", Token).json({
    error: null,
    data: { Token },
    name: user.name,
    level: user.userLevel,
    id: user._id
  });

  // test login route
  // return res.status(200).json({ msg: "Login route..." });
});

// Read all users - GET
Router.get("/", (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

//Get user by ID - GET
Router.get("/user", VerifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// modular exportation
module.exports = Router;
