import express from 'express'
import ClansController from "../controller/clans-controller"
import multer from "multer" 
import multerConfig from "../config/multer" 

const clansController = new ClansController()

const usersRouter = express.Router()

const uploadImage = multer(multerConfig)

usersRouter.get('/clans', clansController.list)
usersRouter.get('/clans/:id', clansController.findOne)
usersRouter.post('/clans', uploadImage.single('icon'), clansController.create)
usersRouter.put('/clans/:id', clansController.update)

export default usersRouter