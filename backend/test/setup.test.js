process.env.NODE_ENV = "test";

const User = require("../models/Users");

beforeEach((done) => {
  User.deleteMany({}, function (err) {});
  done();
});
afterEach((done) => {
  User.deleteMany({}, function (err) {});
  done();
});
