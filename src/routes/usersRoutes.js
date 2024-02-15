import {Router} from 'express';
import { createNewUserController, getAllUsersController, loginUserController } from '../controllers/usersControllers.js';

const userRouter=Router();

userRouter.post('/users/register', createNewUserController)

userRouter.post('/users/login', loginUserController)

userRouter.get('/users', getAllUsersController)

userRouter.get('/users/single/:id',(req,res)=>{
    res.status(201).send("Getting Single user✔💕")
})

userRouter.put('/users/update/:id',(req,res)=>{
    res.status(201).send("User updated Successfully")
})

userRouter.patch('/users/patch/:id',(req,res)=>{
    res.status(201).send("Username updated Successfully")
})

userRouter.delete('/users/delete/:id',(req,res)=>{
    res.status(201).send("Deleted Succesfully")
})


export default userRouter;