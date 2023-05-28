import express from 'express'
import ClansController from "../controller/clans-controller"

const clansController = new ClansController()

const usersRouter = express.Router()

usersRouter.get('/clans', clansController.list)
// usersRouter.get('/users/:id', usersController.findOne)
// usersRouter.post('/users', usersController.create)
// usersRouter.put('/users/:id', usersController.update)

export default usersRouter