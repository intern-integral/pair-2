import React from "react";

const TodoList = ({ todos, handleDelete , settingTodoEdit}) => {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo._id} className="todos">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
            <button
              className="btn-select"
              onClick={() => settingTodoEdit(todo)}
            >
              Select
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
