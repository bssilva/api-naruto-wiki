import express from 'express';
import UserController from "../controller/users-controller";
import multer from "multer"; 
import multerConfig from "../config/multer";
import { authMiddleware, checkUserRole } from '../middleware/auth';

const usersController = new UserController();

const usersRouter = express.Router();

const uploadImage = multer(multerConfig);

usersRouter.get('/users', authMiddleware, usersController.list);
usersRouter.get('/users/:id', authMiddleware, usersController.findOne);
usersRouter.delete('/users/:id', authMiddleware, checkUserRole('Administrator'), usersController.delete);
usersRouter.post('/users', uploadImage.single('avatar'), usersController.create);
usersRouter.post('/users/login', usersController.login);
usersRouter.put('/users/:id', authMiddleware, uploadImage.single('avatar'), usersController.update);

export default usersRouter;