// What the user can send to the db
const { string } = require("joi");
const Mongoose = require("mongoose");
const ProjectsSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: Number,
  color: String,
  created_at: String,
  deadline: String,
  progression: String,
  UserId: String,
});

module.exports = Mongoose.model("Project", ProjectsSchema);
