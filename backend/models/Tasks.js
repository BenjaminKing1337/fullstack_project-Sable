// What the user can send to the db
const Mongoose = require("mongoose");
const TasksSchema = new Mongoose.Schema({
  Task: String,
  Author: String,
});

module.exports = Mongoose.model("Task", TasksSchema);
