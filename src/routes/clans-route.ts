import express from 'express';
import ClansController from "../controller/clans-controller";
import multer from "multer";
import multerConfig from "../config/multer";
import { authMiddleware, checkUserRole } from '../middleware/auth';

const clansController = new ClansController();

const usersRouter = express.Router();

const uploadImage = multer(multerConfig);

usersRouter.get('/clans', authMiddleware, clansController.list);
usersRouter.get('/clans/:id', authMiddleware, clansController.findOne);
usersRouter.delete('/clans/:id', authMiddleware, checkUserRole('Administrator') ,clansController.delete);
usersRouter.post('/clans', authMiddleware, uploadImage.single('icon'), clansController.create);
usersRouter.put('/clans/:id', authMiddleware, uploadImage.single('icon'), clansController.update);

export default usersRouter;