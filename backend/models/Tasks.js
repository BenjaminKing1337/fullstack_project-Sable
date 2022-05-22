// What the user can send to the db
const Mongoose = require("mongoose");
const TasksSchema = new Mongoose.Schema({
  ListId: String,
  task: { type: String, required: true },
  description: String,
  status: { type: String, default: "not-done" },
  is_optional: Boolean,
  created_at: String,
  deadline: String,
  author: String,
});

module.exports = Mongoose.model("Task", TasksSchema);
