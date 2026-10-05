import mongoose from "mongoose";

enum ProjectStatus {
  Planning = "planning",
  InProgress = "in-progress",
  Completed = "completed",
  Cancelled = "cancelled",
}

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "The description is required"],
      trim: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A project must have a client"],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A project must have an owner"],
    },

    budget: {
      type: Number,
      required: [true, "The budget is required"],
      min: [0, "Budget cannot be negative"],
    },

    deadline: {
      type: Date,
    },

    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.Planning,
    },

    coverImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
