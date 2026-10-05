import mongoose, { mongo } from "mongoose";

enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Completed = "completed",
}
enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A task must have a title!"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "The description is required"],
      trim: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "A task must belong to a project"],
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.Todo,
    },

    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.Medium,
    },

    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
