// What the user can send to the db
const Mongoose = require("mongoose");
const ListsSchema = new Mongoose.Schema({
  ProjectId: String,
  title: { type: String, default: "not-done", required: true },
  color: String,
  is_Complete: Boolean,
});
module.exports = Mongoose.model("List", ListsSchema);
