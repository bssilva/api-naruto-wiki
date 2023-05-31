import express from 'express'
import UserController from "../controller/users-controller"
import multer from "multer" 
import multerConfig from "../config/multer" 

const usersController = new UserController()

const usersRouter = express.Router()

const uploadImage = multer(multerConfig)

usersRouter.get('/users', usersController.list)
usersRouter.get('/users/:id', usersController.findOne)
usersRouter.post('/users', uploadImage.single('avatar'), usersController.create)
usersRouter.put('/users/:id', usersController.update)

export default usersRouter