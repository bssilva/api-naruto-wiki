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
    const { authorization } = req.headers;

    const emailUser = authorization && extractEmailFromToken(authorization);

    const listFavoriteCharacterService = new ListFavoriteCharacterService();

    if (!emailUser)
      return res.status(400).send({ error: "Email não encontrado" });

    const listFavoriteCharacter = await listFavoriteCharacterService.execute(emailUser);
    return res.status(200).send({ body: listFavoriteCharacter });
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
      return res.status(201).send({ body: favoriteCharacter });
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const findOneFavoriteCharacterService = new FindOneFavoriteCharacterService();

    try {
      const favoriteCharacter = await findOneFavoriteCharacterService.execute(id);
      return res.status(200).send({ body: favoriteCharacter });
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
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
      return res.status(201).send({ body: favoriteCharacter });
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
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
      return res.status(200).send({ body: favoriteClan });
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  };
}

export default FavoriteCharacterController;
