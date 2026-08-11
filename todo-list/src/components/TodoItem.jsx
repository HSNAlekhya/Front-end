import { useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (editText.trim() === "") {
        return;
        }

        editTodo(todo.id, editText);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
        {isEditing ? (
            <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            />
        ) : (
            <span
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleTodo(todo.id)}
            >
            {todo.text}
            </span>
        )}

        <div className="todo-buttons">
            {isEditing ? (
            <button onClick={handleEdit}>Save</button>
            ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>
            Delete
            </button>
        </div>
        </div>
    );
    }

export default TodoItem;