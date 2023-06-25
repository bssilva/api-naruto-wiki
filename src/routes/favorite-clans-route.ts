import express from 'express';
import FavoriteClansController from "../controller/favorite-clans-controller";
import authMiddleware from '../middleware/auth';

const favoriteClansController = new FavoriteClansController();

const usersRouter = express.Router();

usersRouter.post('/favorite-clans', authMiddleware, favoriteClansController.create);
usersRouter.put('/favorite-clans/:id', authMiddleware, favoriteClansController.update);
usersRouter.delete('/favorite-clans/:id', authMiddleware, favoriteClansController.delete);
usersRouter.get('/favorite-clans/:id', authMiddleware, favoriteClansController.findOne);
usersRouter.get('/favorite-clans', authMiddleware, favoriteClansController.list);

export default usersRouter;