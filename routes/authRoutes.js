const express=require ('express');
const authController=require ('../controllers/authController')
const auth=require ('../middlewares/auth');

const authRouter=express.Router();

authRouter.post('/register',authController.register);
authRouter.post('/login',authController.login);
authRouter.post('/logout',authController.logout);
authRouter.get('/profile',auth.checkAuth,authController.profile)

module.exports=authRouter;