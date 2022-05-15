// What the user can send to the db
const Mongoose = require("mongoose");
const ProjectsSchema = new Mongoose.Schema({
  name: String,
  description: String,
  status: Number,
  created_at: String,
  deadline: String,
  progression: String,
});

module.exports = Mongoose.model("Project", ProjectsSchema);
