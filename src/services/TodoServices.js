import axios from "axios";

const TODO_URL = "http://localhost:3030/api/todos/";

export const getTodos = () => axios.get(TODO_URL);

export const postTodo = (value) =>
  axios.post(TODO_URL, value, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

export const editTodo = (id, value) =>
  axios.patch(`${TODO_URL}/${id}`, value, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

export const deleteTodo = (id) => axios.delete(`${TODO_URL}/${id}`);