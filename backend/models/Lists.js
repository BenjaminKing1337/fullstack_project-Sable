// What the user can send to the db
const Mongoose = require("mongoose");
const ListsSchema = new Mongoose.Schema({
  title: String,
  is_complete: Boolean,
  tasks: String,
});

module.exports = Mongoose.model("List", ListsSchema);
