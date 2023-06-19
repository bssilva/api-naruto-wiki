import { Request, Response } from "express";
import AppError from "../shared/appError";
import ListCharacterService from "../services/characters/list";
import FindOneCharacterService from "../services/characters/findOne";
import CreateCharacterService from "../services/characters/create";

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

  create = async (req: Request, res: Response): Promise<Response> => {
    const { name, about, info, page } = req.body;

    const { images } = (req.files as { [fieldname: string]: Express.Multer.File[] })
    
    const nameImages = images.map(image => { return image.originalname })

    const createCharacterService = new CreateCharacterService()

    try{
      const character = await createCharacterService.execute({ name, about, info, page, images: nameImages })
      return res.status(201).send({ body: character });

    }catch(err){
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  };
}

export default ClansController;