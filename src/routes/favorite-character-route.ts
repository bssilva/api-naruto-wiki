import express from 'express';
import FavoriteCharacterController from "../controller/favorite-character-controller";
import authMiddleware from '../middleware/auth';

const favoriteCharacterController = new FavoriteCharacterController();

const usersRouter = express.Router();

usersRouter.post('/favorite-character', authMiddleware, favoriteCharacterController.create);
usersRouter.put('/favorite-character/:id', authMiddleware, favoriteCharacterController.update);
usersRouter.get('/favorite-character/:id', authMiddleware, favoriteCharacterController.findOne);
usersRouter.get('/favorite-character', authMiddleware, favoriteCharacterController.list);

export default usersRouter;