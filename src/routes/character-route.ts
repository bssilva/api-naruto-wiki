import express from 'express';
import CharacterController from "../controller/character-controller";
import multer from "multer";
import multerConfig from "../config/multer";

const characterController = new CharacterController();

const charactersRouter = express.Router();

const uploadImage = multer(multerConfig);

charactersRouter.get('/characters', characterController.list);
charactersRouter.get('/characters/:id', characterController.findOne);
charactersRouter.post('/characters', uploadImage.fields([{ name: 'images', maxCount: 2}]), characterController.create);
charactersRouter.put('/characters/:id', uploadImage.fields([{ name: 'images', maxCount: 2}]), characterController.update);

export default charactersRouter;