import { Request, Response } from "express";
import AppError from "../shared/appError";
import CreateFavoriteCharacterService from "../services/favoriteCharacters/create";
import FindOneFavoriteCharacterService from "../services/favoriteCharacters/findOne";
import ListFavoriteCharacterService from "../services/favoriteCharacters/list";
import UpdateFavoriteCharacterService from "../services/favoriteCharacters/update";
import DeleteFavoriteCharacterService from "../services/favoriteCharacters/delete";
import { extractEmailFromToken } from "../utils/jwtUtils";

class FavoriteCharacterController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const { page = 1, limit = 10 } = req.query;
  
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    const listFavoriteCharacterService = new ListFavoriteCharacterService();

    if (!emailUser)
      return res.status(400).send({ error: "Email não encontrado" });

    const listFavoriteCharacter = await listFavoriteCharacterService.execute(emailUser, Number(page), Number(limit));
    return res.status(200).send(listFavoriteCharacter);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { idCharacter } = req.body;
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    const createFavoriteCharacterService = new CreateFavoriteCharacterService();

    if (!emailUser)
      return res.status(400).send({ message: "Email não encontrado" });

    try {
      const favoriteCharacter = await createFavoriteCharacterService.execute({ emailUser, idCharacter });
      return res.status(201).send(favoriteCharacter);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send({ body: err });
    }
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const findOneFavoriteCharacterService = new FindOneFavoriteCharacterService();

    try {
      const favoriteCharacter = await findOneFavoriteCharacterService.execute(id);
      return res.status(200).send(favoriteCharacter);
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
    const { idCharacter } = req.body;
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    if (!emailUser)
      return res.status(400).send({ message: "Email não encontrado" });

    const updateFavoriteCharacterService = new UpdateFavoriteCharacterService();

    try {
      const favoriteCharacter = await updateFavoriteCharacterService.execute({
        id: Number(id),
        emailUser,
        idCharacter,
      });
      return res.status(201).send(favoriteCharacter);
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

    const deleteFavoriteCharacterService = new DeleteFavoriteCharacterService();

    try {
      const favoriteClan = await deleteFavoriteCharacterService.execute(Number(id), emailUser);
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

export default FavoriteCharacterController;
