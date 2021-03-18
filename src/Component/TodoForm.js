import React, { useState, useEffect } from 'react';

const TodoForm = ({ handleAdd, todoEdit, handleEdit }) => {
  const [title, setTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editDescription, setEditDescription] = useState('');
  
  useEffect(() => {
    setEditTitle(todoEdit.title);
    setEditDescription(todoEdit.description);
  }, [todoEdit.title, todoEdit.description])

  const editClick = () => {
    handleEdit(todoEdit._id, editTitle, editDescription);
    setEditTitle("");
    setEditDescription("")
  }
  return (
    <>
    <div className="">
      <label className="addLabel" htmlFor="">Input Todo : </label>
      <input
        className="addInput-title"
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="addInput-desc"
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn_add" onClick={() => handleAdd(title, description)}>Add</button>
    </div>
     <div className="">
      <label className="editLabel" htmlFor="">Edit Todo : </label>
      <input
        className="input-title-edit"
        type="text"
        placeholder="title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        className="input-desc-edit"
        type="text"
        placeholder="description"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
      />
      <button className="btn-edit" onClick={editClick}>Edit</button>
    </div></>
  );
};

export default TodoForm;
