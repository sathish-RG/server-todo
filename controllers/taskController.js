const Task = require('../models/task');
const User = require('../models/User'); // ✅ Correct import

const taskController = {
  createTask: async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { userId } = req;
    
    const newTask = await Task.create({ userId, title, description, status });

    await User.findByIdAndUpdate(userId, { $push: { TaskIds: newTask._id } });

    res.status(201).json(newTask); // ✅ Return full task to frontend
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},


  getAllTask: async (req, res) => {
    try {
      const userId = req.userId;
      const tasks = await Task.find({ userId });
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

 updateTask: async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask); // ✅ Return the updated task
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},


  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = taskController;
