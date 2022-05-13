const Express = require("express");
const Router = Express.Router();
const Task = require("../models/Tasks");

// Get all Task routes
Router.get("/", async (Req, Res) => {
  const Tasks = await Task.find();
  Res.json(Tasks);
});

// Create new Task route
Router.post("/new", async (Req, Res) => {
  const NewTask = new Task(
    Req.body // What the Vue App is sending
    // { // pass in body content to be stored in DB
    //   author: "Flanders",
    //   task: "Go to Canada",
    // }
  );
  const SavedTask = await NewTask.save(); // mongo save method
  Res.json(SavedTask); // respond with json to our post endpoint
});

// Get Task by id route
Router.get("/get/:id", async (Req, Res) => {
  const IdTask = await Task.findById({ _id: Req.params.id });
  Res.json(IdTask);
});

// Delete Task by id route
Router.delete("/delete/:id", async (Req, Res) => {
  const DelTask = await Task.findByIdAndDelete({ _id: Req.params.id });
  Res.json(DelTask);
});

// Update Task by id route
Router.put("/update/:id", async (Req, Res) => {
  const UpdTask = await Task.updateOne(
    { _id: Req.params.id },
    { $set: Req.body },
    // {
    //   author: "Bart",
    //   task: "Go Skating",
    // }
  );
  Res.json(UpdTask);
});

module.exports = Router;
