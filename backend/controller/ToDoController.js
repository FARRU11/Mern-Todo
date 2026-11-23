const mongoose = require("mongoose");
const ToDoModel = require("../models/ToDoModel");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

module.exports.getToDos = async (_req, res, next) => {
  try {
    const toDos = await ToDoModel.find().sort({ _id: -1 });
    res.json(toDos);
  } catch (err) {
    next(err);
  }
};

module.exports.saveToDo = async (req, res, next) => {
  try {
    const toDo = cleanText(req.body.toDo);
    if (!toDo) return res.status(400).json({ msg: "toDo text is required" });

    const created = await ToDoModel.create({ toDo });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

module.exports.updateToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDo = cleanText(req.body.toDo);
    if (!isValidId(id)) return res.status(400).json({ msg: "Invalid id" });
    if (!toDo) return res.status(400).json({ msg: "toDo text is required" });

    const updated = await ToDoModel.findByIdAndUpdate(id, { toDo }, { new: true });
    if (!updated) return res.status(404).json({ msg: "ToDo not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ msg: "Invalid id" });

    const deleted = await ToDoModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ msg: "ToDo not found" });
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
