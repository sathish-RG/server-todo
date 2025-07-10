const express=require ('express');
const app=express();
const morgan= require('morgan');
const cookieParser=require('cookie-parser');
const cors= require('cors');
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}));

app.use('/api/v1/tasks',taskRouter);
app.use('/api/v1/auth',authRouter);


module.exports=app;