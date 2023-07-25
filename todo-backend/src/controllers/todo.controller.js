import todoModel from "../models/todo.model.js";
import { v4 as uuidv4 } from "uuid";

const getTodo = async (req, res, next) => {
  try {
    const todos = await todoModel.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const todoId = uuidv4(); // Generate a random UUID
    const newTodo = await todoModel.create({ todoId, title, description, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.body;
    const { title, description, completed } = req.body;

    // Ensure at least one field is provided for updating
    if (!title && !description && completed === undefined) {
      res.status(400).json({ error: "At least one field is required for updating" });
      return;
    }

    const updatedTodo = await todoModel.findOneAndUpdate(
      { todoId }, // Update based on todoId field
      { title, description, completed },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const deletedTodo = await todoModel.findOneAndDelete({todoId});

    if (!deletedTodo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.status(200).json({message: "todo deleted"});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getTodo, addTodo, updateTodo, deleteTodo };
