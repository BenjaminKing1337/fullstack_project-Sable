const Express = require("express");
const Router = Express.Router();
const Project = require("../models/Projects");

// Get all Project routes
Router.get("/", async (Req, Res) => {
  const Projects = await Project.find();
  Res.json(Projects);
});

// Create new Project route
Router.post("/new", async (Req, Res) => {
  try {
    const NewProject = new Project(
      Req.body // What the Vue App is sending
    );
    const SavedProject = await NewProject.save(); // mongo save method
    Res.json(SavedProject); // respond with json to our post endpoint
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Get Projects by User id route
Router.get("/get/:id", async (Req, Res) => {
  try {
    const IdProject = await Project.find({ UserId: Req.params.id });
    Res.json(IdProject);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Delete Project by id route
Router.delete("/delete/:id", async (Req, Res) => {
  try {
    const DelProject = await Project.findByIdAndDelete({ _id: Req.params.id });
    Res.json(DelProject);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Update Project by id route
Router.put("/update/:id", async (Req, Res) => {
  try {
    const UpdProject = await Project.updateOne(
      { _id: Req.params.id },
      { $set: Req.body }
    );
    Res.json(UpdProject);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

module.exports = Router;
