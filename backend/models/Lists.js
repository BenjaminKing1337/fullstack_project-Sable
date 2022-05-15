// What the user can send to the db
const Mongoose = require("mongoose");
const ListsSchema = new Mongoose.Schema({
  title: String,
  is_Complete: Boolean,
  tasks: Array,
});

module.exports = Mongoose.model("List", ListsSchema);
