import express from 'express';
import FavoriteClansController from "../controller/favorite-clans-controller";
import authMiddleware from '../middleware/auth';

const favoriteClansController = new FavoriteClansController();

const usersRouter = express.Router();

usersRouter.post('/favorite-clans', authMiddleware, favoriteClansController.create);

export default usersRouter;