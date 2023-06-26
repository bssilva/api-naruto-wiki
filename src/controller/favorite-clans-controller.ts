import { Request, Response } from "express";
import AppError from "../shared/appError";
import CreateFavoriteClanService from "../services/favoriteClans/create";
import FindOneFavoriteClanService from "../services/favoriteClans/findOne";
import ListFavoriteClanService from "../services/favoriteClans/list";
import UpdateFavoriteClanService from "../services/favoriteClans/update";
import DeleteFavoriteClanService from "../services/favoriteClans/delete";
import jwt, { JwtPayload } from "jsonwebtoken";
import { extractEmailFromToken } from "../utils/jwtUtils";

class FavoriteClansController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    const listFavortieClanService = new ListFavoriteClanService();

    if (!emailUser)
      return res.status(400).send({ error: "Email não encontrado" });

    const listFavortieClan = await listFavortieClanService.execute(emailUser);
    return res.status(200).send(listFavortieClan);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { idClan } = req.body;
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    const createFavoriteClanService = new CreateFavoriteClanService();

    if (!emailUser)
      return res.status(400).send({ message: "Email não encontrado" });

    try {
      const favoriteClan = await createFavoriteClanService.execute({
        emailUser,
        idClan,
      });
      return res.status(201).send(favoriteClan);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const findOneFavoriteClanService = new FindOneFavoriteClanService();

    try {
      const favoriteClan = await findOneFavoriteClanService.execute(id);
      return res.status(200).send(favoriteClan);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { idClan } = req.body;
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    if (!emailUser)
      return res.status(400).send({ message: "Email não encontrado" });

    const updateFavoriteClanService = new UpdateFavoriteClanService();

    try {
      const favoriteClan = await updateFavoriteClanService.execute({
        id: Number(id),
        emailUser,
        idClan,
      });
      return res.status(201).send(favoriteClan);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    if (!emailUser)
      return res.status(400).send({ message: "Email não encontrado" });

    const deleteFavoriteClanService = new DeleteFavoriteClanService();

    try {
      const favoriteClan = await deleteFavoriteClanService.execute(Number(id), emailUser);
      return res.status(200).send(favoriteClan);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };
}

export default FavoriteClansController;
