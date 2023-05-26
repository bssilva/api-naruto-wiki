import express from 'express'
import clansController from "../controller/clans-controller"

const clansRouter = express.Router()

clansRouter.get('/clans', clansController.getClans)
clansRouter.get('/clans/:id', clansController.getClanById)
clansRouter.post('/clans', clansController.postClans)
clansRouter.put('/clans/:id', clansController.putClans)

export default clansRouter