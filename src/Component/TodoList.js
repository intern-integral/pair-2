import React from "react";

const TodoList = ({ todos, handleDelete }) => {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="todos">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
