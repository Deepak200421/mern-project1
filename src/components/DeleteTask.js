import React from 'react';

const DeleteTask = ({ task, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div>
      <h2>Delete Task</h2>
      <p>Are you sure you want to delete this task?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTask;
