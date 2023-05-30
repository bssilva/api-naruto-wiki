import express from 'express'
import ClansController from "../controller/clans-controller"

const clansController = new ClansController()

const usersRouter = express.Router()

usersRouter.get('/clans', clansController.list)
usersRouter.get('/clans/:id', clansController.findOne)
usersRouter.post('/clans', clansController.create)
usersRouter.put('/clans/:id', clansController.update)

export default usersRouter