import express from 'express';
import CharacterController from "../controller/character-controller";
import multer from "multer";
import multerConfig from "../config/multer";
import { authMiddleware } from '../middleware/auth';

const characterController = new CharacterController();

const charactersRouter = express.Router();

const uploadImage = multer(multerConfig);

charactersRouter.get('/characters', authMiddleware, characterController.list);
charactersRouter.get('/characters/:id', authMiddleware, characterController.findOne);
charactersRouter.post('/characters', authMiddleware, uploadImage.fields([{ name: 'images', maxCount: 2}]), characterController.create);
charactersRouter.put('/characters/:id', authMiddleware, uploadImage.fields([{ name: 'images', maxCount: 2}]), characterController.update);

export default charactersRouter;