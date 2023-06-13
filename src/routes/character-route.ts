import express from 'express';
import CharacterController from "../controller/character-controller";
import multer from "multer";
import multerConfig from "../config/multer";

const characterController = new CharacterController();

const charactersRouter = express.Router();

const uploadImage = multer(multerConfig);

charactersRouter.get('/characters', characterController.list);
charactersRouter.get('/characters/:id', characterController.findOne);

export default charactersRouter;