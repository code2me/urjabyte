import { Router } from "express";
import { 
  getTodo, 
  addTodo, 
  updateTodo, 
  deleteTodo 
} from "../controllers/todo.controller.js";
const todoRouter = Router();

//testing
// todoRouter.get('/', (req, res) => {
//   res.json({message: "Server is working"})
// })

// base route: /public
todoRouter.route("/")
  .get(getTodo)
  .post(addTodo)
  .put(updateTodo)
  
todoRouter.route("/:todoId").delete(deleteTodo)

export default todoRouter;
