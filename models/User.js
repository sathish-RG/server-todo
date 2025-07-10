const mongoose=require ('mongoose');

const userSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    minlength:8,
    trim:true
  },
  name:{
    type:String,
    required:true,
    trim:true
  },
  TaskIds:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task', // 👈 Reference to "Task" model
    }]
 
});
module.exports=mongoose.model('User',userSchema,'users');