import { useState, useEffect } from "react";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(VITE_BACKEND_URL);
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    try {
      setLoading(true);
      await axios.post(VITE_BACKEND_URL, newTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (todoId, completed) => {
    try {
      setLoading(true);
      await axios.put(VITE_BACKEND_URL, { todoId, completed });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      setLoading(true);
      await axios.delete(`${VITE_BACKEND_URL}/${todoId}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Add Todo</h2>
      <form className="addTodoForm" onSubmit={handleAddTodo}>
        <input
          className="addTodoInput"
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <textarea
          className="addTodoTextarea"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button type="submit" className="addButton">
          Add
        </button>
      </form>
      <h2>Todos</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul className="todos">
          {todos.map((todo) => (
            <li key={todo.todoId} className="todoItem">
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    handleUpdateTodo(todo.todoId, !todo.completed)
                  }
                />
                <span className="todoTitle">{todo.title}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.todoId)}
                  className="deleteButton"
                >
                  Delete
                </button>
              </div>
              {todo.description ? (
                <p className="todoDescription">{todo.description}</p>
              ) : (
                <p className="todoDescription">No description available.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
