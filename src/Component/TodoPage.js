import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import {getTodos, postTodo, editTodo, deleteTodo} from "../services/TodoServices"

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isRefetch, setIsRefetch] = useState(true);
  const [todoEdit, setTodoEdit] = useState({});
  
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setIsRefetch(true)
    } catch (error) {
      console.log(error)
    }
  };

  const fetchingData = async () => {
    try {
      const { data: { data }, } = await getTodos();
      setTodos(data);
      setIsRefetch(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(isRefetch){
      fetchingData();
    }
  }, [isRefetch])

  const handleAdd = async (title, description) => {
    const body = {
      title, description
    }
    try {
      await postTodo(body);
    } catch (error) {
      console.log(error)
    }
    setIsRefetch(true);
  } 

  const handleEdit = async (id, title, description) => {
    const editedTodo = {
      title, description
    }
    try {
      await editTodo(id, editedTodo);
      setIsRefetch(true);
      setTodoEdit({})
    } catch(error){
      console.log(error)
    }
  } 

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm handleAdd={handleAdd} todoEdit={todoEdit} handleEdit={handleEdit}/>
      <TodoList todos={todos} handleDelete={handleDelete} settingTodoEdit={setTodoEdit} />
    </div>
  );
};

export default TodoPage;
