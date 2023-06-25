import { Request, Response } from "express";
import AppError from "../shared/appError";
import ListCharacterService from "../services/characters/list";
import FindOneCharacterService from "../services/characters/findOne";
import CreateCharacterService from "../services/characters/create";
import UpdateCharacterSerice from "../services/characters/update";

class ClansController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const listCharacterService = new ListCharacterService();
    const estado = req.query.estado?.toString();
    const sexo = req.query.sexo?.toString();
    const classificacao = req.query.classificacao?.toString();
    const nome = req.query.nome?.toString();
    const cla = req.query.cla?.toString();

    try {
      const character = await listCharacterService.execute({
        estado,
        sexo,
        classificacao,
        nome,
        cla,
      });
      return res.status(200).send({ body: character });
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

    const { images } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const nameImages = images.map((image) => {
      return image.originalname;
    });

    const createCharacterService = new CreateCharacterService();

    try {
      const character = await createCharacterService.execute({
        name,
        about,
        info,
        page,
        images: nameImages,
      });
      return res.status(201).send({ body: character });
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { name, about, info, page } = req.body;
      const { images } = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const nameImages = images.map((image) => {
        return image.originalname;
      });

      const updateCharacterService = new UpdateCharacterSerice();
      const character = await updateCharacterService.execute({
        id: Number(id),
        name,
        about,
        info,
        page,
        images: nameImages,
      });

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
