import { Request, Response } from "express";
import AppError from "../shared/appError";
import ListCharacterService from "../services/characters/list";
import FindOneCharacterService from "../services/characters/findOne";

class ClansController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const listCharacterService = new ListCharacterService();

    const character = await listCharacterService.execute();

    return res.status(200).send({ body: character });
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const findOneCharacterService = new FindOneCharacterService();

    try {
      const character = await findOneCharacterService.execute(id);
      return res.status(200).send({ body: character });

    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  };
}

export default ClansController;
