import React, { useState } from "react";
import TodoList from "./TodoList";
import data from "./data.js";

const TodoPage = () => {
  const [todos, setTodos] = useState(data);
  const handleDelete = (deleteId) => {
    const newTodos = todos.filter((todo) => todo.id !== deleteId);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} handleDelete={handleDelete} />
    </div>
  );
};

export default TodoPage;
