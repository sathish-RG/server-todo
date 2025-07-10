const express= require('express');
const taskController=require('../controllers/taskController');
const auth = require('../middlewares/auth');

const taskRouter=express.Router();

taskRouter.post('/',auth.checkAuth, taskController.createTask);
taskRouter.get('/',auth.checkAuth,taskController.getAllTask);
taskRouter.put('/:id',auth.checkAuth,taskController.updateTask);
taskRouter.delete('/:id',auth.checkAuth,taskController.deleteTask);


module.exports=taskRouter;