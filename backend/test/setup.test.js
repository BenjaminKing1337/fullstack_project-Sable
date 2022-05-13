process.env.NODE_ENV = "test";

const Task = require("../models/Tasks");
const User = require("../models/Users");

beforeEach((done) => {
  Task.deleteMany({}, function (err) {});
  User.deleteMany({}, function (err) {});
  done();
});
afterEach((done) => {
  Task.deleteMany({}, function (err) {});
  User.deleteMany({}, function (err) {});
  done();
});
