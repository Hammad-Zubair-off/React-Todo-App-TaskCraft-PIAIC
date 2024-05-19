import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { v4 as uuidv4 } from 'uuid';
import './Todo.css';

export default function Todo() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);

  function handleTaskInputChange(e) {
    setTask(e.target.value);
  }

  function handleAddTask() {
    if (task.length !== 0) {
      if (editId !== null) {
        setTodo(todo.map((item) => {
          if (item.ID === editId) {
            item.task = task;
          }
          return item;
        }));
        setEditId(null);
      } else {
        const newTask = { task: task, ID: uuidv4(), isdone: false };
        setTodo([...todo, newTask]);
      }
      setTask(""); 
    } else {
      alert("Task cannot be empty. Please enter a task.");
    }
  }

  function handleToggleTaskCompletion(id) {
    setTodo(todo.map((item) => {
      if (item.ID === id) {
        item.isdone = !item.isdone; 
      }
      return item;
    }));
  }

  function handleDeleteTask(id) {
    setTodo(todo.filter((item) => item.ID !== id));
  }

  function handleStartEditing(id, text) {
    setEditId(id);
    setTask(text);
  }

  return (
    <>
      <h2 className='todo-header'>Todo List</h2>

      <input
        type="text"
        name="task-input"
        className={`task-input ${editId !== null ? 'editing' : ''}`}
        placeholder='Enter the task'
        value={task}
        onChange={handleTaskInputChange}
      />
      <br />
      <button className='btn btn-primary add-task-btn' onClick={handleAddTask}>
        {editId !== null ? "Save Task" : "Add Task"}
      </button>

      <h2 className='tasks-header'>Tasks</h2>

      {todo.map((item) => (
        <div className='task-item' key={item.ID}>
          <div className='task-info'>
            <input
              type="checkbox"
              checked={item.isdone}
              onChange={() => handleToggleTaskCompletion(item.ID)}
            />
            <p className={`task-text ${item.isdone ? 'completed' : ''}`}>{item.task}</p>
          </div>
          <div className='task-actions'>
            <button
              type="button"
              className="btn btn-success edit-btn"
              onClick={() => handleStartEditing(item.ID, item.task)}
            >
              <i className='fas fa-pen'></i>             
            </button>
            <button
              type="button"
              className="btn btn-danger delete-btn"
              onClick={() => handleDeleteTask(item.ID)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
