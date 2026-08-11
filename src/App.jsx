import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (task) => {
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };


  // Complete / uncomplete task
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete task
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit task
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText }
          : todo
      )
    );
  };

  // Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  return (
  <div className="app">
    <div className="todo-container">

      <h1>My To-Do List</h1>

      <TodoForm addTodo={addTodo} />

      <TodoFilter
        filter={filter}
        setFilter={setFilter}
      />

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))
        )}
      </div>

      <p className="task-count">
        Total Tasks: {todos.length}
      </p>

    </div>
  </div>
);
}

export default App;