import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todoId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "todos",
  }
);

export default mongoose.model("todos", todoSchema);
