const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, "Enter name of task"],
    maxLength: [100, "100 characters max"],
  },
  taskStatus: {
    type: String,
    enum: {
      values: ["completed", "inprogress", "assigned"],
    },
    default: "assigned",
  },
  taskDeadline: {
    type: Date,
    required: [true, "Enter task deadline"],
  },
  taskOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Need an owner of task"],
  },
  taskProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: [true, "Task needs to be assigned inside a project"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
