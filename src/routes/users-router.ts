import express from 'express'
import UserController from "../controller/users-controller"
import UserRepository from '../repository/user-repository'
import UserService from '../services/users-service'

const usersController = new UserController()

const usersRouter = express.Router()

// usersRouter.get('/users', usersController.list)
usersRouter.get('/users/:id', usersController.findOne)
// usersRouter.post('/users', usersController.create)
// usersRouter.put('/users/:id', usersController.update)

export default usersRouter