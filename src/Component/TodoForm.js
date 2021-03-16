import React, { useState } from "react";

const TodoForm = ({handleAdd}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const handleChangeTitle = (event) => {
    //     return setTitle(event)
    // }
    return (
        <div className="">
            <label className="addLabel" htmlFor="">Input Todo : </label>
            <input className="addInput-title" type="text" placeholder="title" value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            <input className="addInput-desc" type="text" placeholder="description" value={description} 
                onChange={(e) => setDescription(e.target.value)}/>
            <button className="btn_add" onClick={() => handleAdd(title, description)}>Add</button>
        </div>
    )
    
}

export default TodoForm;