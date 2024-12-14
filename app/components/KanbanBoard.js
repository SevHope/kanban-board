"use client";
import React, { useState, useEffect } from 'react';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('./pages/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (title, status) => {
    fetch('./pages/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, status }),
    })
    .then(res => res.json())
    .then(newTask => setTasks([...tasks, newTask]));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {columns.map(column => (
        <div key={column.id} style={{ flex: 1, padding: 10 }}>
          <h2>{column.title}</h2>
          {tasks.filter(task => task.status === column.id).map(task => (
            <div key={task.id} style={{ padding: 5, border: '1px solid black', margin: '5px 0' }}>
              {task.title}
            </div>
          ))}
          <button onClick={() => addTask(`New Task ${tasks.length + 1}`, column.id)}>
            Add Task
          </button>
        </div>
      ))}
    </div>
  );
}
