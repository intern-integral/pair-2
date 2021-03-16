import React, { useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import data from "./data.js";

const TodoPage = () => {
  const [todos, setTodos] = useState(data);
  
  const handleDelete = (deleteId) => {
    const newTodos = todos.filter((todo) => todo.id !== deleteId);
    setTodos(newTodos);
  };

  const handleAdd = (title, description) => {
    const lastIndex = todos.length;
    const todo = {
      id: lastIndex + 1,
      title,
      description,
    }
    console.log(title); 
    console.log(description);
    setTodos([...todos, todo])
   
  } 
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm handleAdd={handleAdd}/>
      <TodoList todos={todos} handleDelete={handleDelete} />
    </div>
  );
};

export default TodoPage;
