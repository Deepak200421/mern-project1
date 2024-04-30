import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/tasks/tasks');
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      <h2>Task Management</h2>
      <div>
        {tasks.map(task => (
          <div key={task.id}>
            <h3>{task.taskName}</h3>
            <p>{task.taskDescription}</p>
            <p>Category: {task.taskCategory}</p>
            <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManagement;
