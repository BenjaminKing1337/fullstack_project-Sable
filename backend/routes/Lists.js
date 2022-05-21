const Express = require("express");
const Router = Express.Router();
const List = require("../models/Lists");

// Get all List routes
Router.get("/", async (Req, Res) => {
  const Lists = await List.find();
  Res.json(Lists);
});

// Create new List route
Router.post("/new", async (Req, Res) => {
  try {
    const NewList = new List(
      Req.body // What the Vue App is sending
    );
    const SavedList = await NewList.save(); // mongo save method
    Res.json(SavedList); // respond with json to our post endpoint
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Get List by id route
// Router.get("/get/:id", async (Req, Res) => {
//   try {
//     const IdList = await List.findById({ _id: Req.params.id });
//     Res.json(IdList);
//   } catch (fish) {
//     Res.status(400).json({ fish });
//   }
// });
Router.get("/get/:id", async (Req, Res) => {
  try {
    const IdList = await List.find({ ProjectId: Req.params.id });
    Res.json(IdList);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Delete List by id route
Router.delete("/delete/:id", async (Req, Res) => {
  try {
    const DelList = await List.findByIdAndDelete({ _id: Req.params.id });
    Res.json(DelList);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

// Update List by id route
Router.put("/update/:id", async (Req, Res) => {
  try {
    const UpdList = await List.updateOne(
      { _id: Req.params.id },
      { $set: Req.body }
    );
    Res.json(UpdList);
  } catch (fish) {
    Res.status(400).json({ fish });
  }
});

module.exports = Router;
