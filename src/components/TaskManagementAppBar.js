import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom'; 
import TaskManagementIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import AccountIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Import CSS file
import './TaskManagementAppBar.css'; 

// Define the logout function
function handleLogout(navigate) {
  console.log('Logging out...');
  // Redirect the user to the login page
  navigate('/');
}

// Define the settings array
const settings = [
  { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
  { label: 'Account', icon: <AccountIcon />, path: '/account' },
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Logout', icon: <LogoutIcon />, action: handleLogout }
];

// Define the TaskManagementAppBar component
function TaskManagementAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskCategory, setEditTaskCategory] = useState('');
  const [filterSymbol, setFilterSymbol] = useState('');
  const navigate = useNavigate();

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
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSettingsMenu = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  const handleDeleteTask = async (taskName) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/tasks/tasks/${taskName}`);
      console.log('Task deleted:', response.data);
      // Filter out the deleted task from the tasks list
      setTasks(tasks.filter(task => task.taskName !== taskName));
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error
    }
  };
  

  const handleEditTask = async (taskName, taskDescription, taskCategory) => {
    setEditTaskName(taskName);
    setEditTaskDescription(taskDescription);
    setEditTaskCategory(taskCategory);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      // Send the updated task details to the server
      await axios.put(`http://localhost:8081/api/tasks/tasks/${editTaskName}`, {
        taskName: editTaskName,
        taskDescription: editTaskDescription,
        taskCategory: editTaskCategory
      });
      // Reload the tasks list after successful update
      const response = await axios.get('http://localhost:8081/api/tasks/tasks');
      setTasks(response.data.tasks);
      // Clear the edit form fields
      setEditTaskName('');
      setEditTaskDescription('');
      setEditTaskCategory('');
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Modify handleFilterChange function to update the filter symbol correctly
  const handleFilterChange = (symbol) => {
    setFilterSymbol(symbol);
  };

  // Apply filter to tasks based on the selected symbol
  const filteredTasks = filterSymbol ? tasks.filter(task => task.taskCategory === filterSymbol) : tasks;

  return (
    <React.Fragment>
      <AppBar position="static" sx={{ backgroundColor: 'brick' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Task Management icon */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <TaskManagementIcon />
            </IconButton>

            {/* Text related to task management */}
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
              Task Management System
            </Typography>

            {/* Navigation menu for smaller screens */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* Navigation menu items */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/tasks">Tasks</MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/deletetask">Delete Task</MenuItem>
              </Menu>
            </Box>

            {/* Navigation buttons for larger screens */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} to="/tasks" sx={{ mx: 1, color: 'white' }}>Tasks</Button>
              <Button component={Link} to="/deletetask" sx={{ mx: 1, color: 'white' }}>Delete Task</Button>
            </Box>

            {/* Settings menu for larger screens */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0, ml: 2 }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              {/* Settings menu items */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElSettings}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElSettings)}
                onClose={handleCloseSettingsMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={() => setting.action && setting.action(navigate)} component={Link} to={setting.path}>
                    {setting.icon}
                    <Typography sx={{ ml: 1 }}>{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Filter menu */}
      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <select value={filterSymbol} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">All</option>
            <option value="⚙️">⚙️</option> {/* Work */}
            <option value="🏠">🏠</option> {/* Personal */}
            <option value="📚">📚</option> {/* Study */}
            <option value="🔖">🔖</option> {/* Other */}
          </select>
        </Box>
      </Container>
      {/* Display added tasks */}
      <Container maxWidth="xl">
        <div className="task-cards">
          {filteredTasks.length === 0 ? <p>No tasks found</p> : (
            filteredTasks.map(task => (
              <div key={task.id} className="task-card">
                <h3>{task.taskName}</h3>
                <p>{task.taskDescription}</p>
                <p>Category: {task.taskCategory}</p>
                <div>
                  <IconButton onClick={() => handleDeleteTask(task.taskName)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEditTask(task.taskName, task.taskDescription, task.taskCategory)}>
                    <EditIcon />
                  </IconButton>
                </div>
                {/* Form for editing the task */}
                {editTaskName && (
                  <form className="task-form" onSubmit={handleSubmitEdit}>
                    <label>Task Name:</label>
                    <input type="text" value={editTaskName} onChange={(e) => setEditTaskName(e.target.value)} required />
                    <label>Task Description:</label>
                    <textarea value={editTaskDescription} onChange={(e) => setEditTaskDescription(e.target.value)} required></textarea>
                    <label>Task Category:</label>
                    <select value={editTaskCategory} onChange={(e) => setEditTaskCategory(e.target.value)} required>
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Study">Study</option>
                      <option value="Other">Other</option>
                    </select>
                    <input type="submit" value="Submit" />
                  </form>
                )}
              </div>
            ))
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default TaskManagementAppBar;
