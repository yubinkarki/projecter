import { Schema, model } from "mongoose";

const taskSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Need an owner of task"],
  },
  taskProject: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: [true, "Task needs to be assigned inside a project"],
  },
});

export default model("Task", taskSchema);
