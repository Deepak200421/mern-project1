// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.delete('/tasks/:taskName', taskController.deleteTaskByName);
router.put('/tasks/:taskName', taskController.updateTask); // Route to delete tasks by task category

module.exports = router;
