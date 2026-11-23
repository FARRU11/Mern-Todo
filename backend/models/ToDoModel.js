const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    toDo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ToDo", toDoSchema);
