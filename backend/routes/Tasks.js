const Express = require("express");
const Router = Express.Router();
const Task = require("../models/Tasks");

// Get all Task routes
Router.get("/", async (Req, Res) => {
  try {
    const Tasks = await Task.find();
    Res.json(Tasks);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Create new Task route
Router.post("/new", async (Req, Res) => {
  try {
    const NewTask = new Task(
      Req.body // What the Vue App is sending
    );
    const SavedTask = await NewTask.save(); // mongo save method
    Res.json(SavedTask); // respond with json to our post endpoint
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Get Task by id route
Router.get("/get/:id", async (Req, Res) => {
  try {
    const IdTask = await Task.findById({ _id: Req.params.id });
    Res.json(IdTask);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Get Task by List id route
Router.get("/get/byList/:id", async (Req, Res) => {
  try {
    const IdList = await Task.find({ ListId: Req.params.id });
    Res.json(IdList);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Delete Task by id route
Router.delete("/delete/:id", async (Req, Res) => {
  try {
    const DelTask = await Task.findByIdAndDelete({ _id: Req.params.id });
    Res.json(DelTask);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Update Task by id route
Router.put("/update/:id", async (Req, Res) => {
  const UpdTask = await Task.updateOne(
    { _id: Req.params.id },
    { $set: Req.body }
  );
  Res.json(UpdTask);
});

module.exports = Router;
