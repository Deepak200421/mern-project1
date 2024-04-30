import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddTaksk.css';
import axios from 'axios';

function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [dueDate, setDueDate] = useState(null); // State for due date
  const navigate = useNavigate();

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleTaskCategoryChange = (event) => {
    setTaskCategory(event.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/tasks/tasks', {
        taskName,
        taskDescription,
        taskCategory,
        dueDate // Include dueDate in the request payload
      });
      console.log('Task submitted:', response.data.task);
      setTaskName('');
      setTaskDescription('');
      setTaskCategory('');
      setDueDate(null); // Reset dueDate state after submission
      navigate('/taskmanagement');
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="add-task-container">
        <div className="card-switch">
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Add New Task</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  type="text"
                  value={taskName}
                  onChange={handleTaskNameChange}
                  placeholder="Task Name"
                  required
                />
                <textarea
                  className="flip-card__input"
                  value={taskDescription}
                  onChange={handleTaskDescriptionChange}
                  placeholder="Task Description"
                  required
                ></textarea>
                <select
                  className="flip-card__input"
                  value={taskCategory}
                  onChange={handleTaskCategoryChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                  <option value="Other">Other</option>
                </select>
                <DatePicker
                  selected={dueDate}
                  onChange={handleDueDateChange}
                  dateFormat="dd/MM/yyyy" // Customize date format
                  placeholderText="Due Date" // Placeholder for the input field
                  className="flip-card__input" // Apply the same styling as other inputs
                  isClearable // Allow clearing the date
                />
                <button type="submit" className="flip-card__btn">Add Task</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
