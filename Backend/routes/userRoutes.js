import express from 'express'
import {registerUser,loginUser, userCredit, logout} from '../controllers/userController.js'
import { authUser } from '../middlewares/authmiddleware.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',authUser,userCredit)
userRouter.post('/logout',logout)




export default userRouter
