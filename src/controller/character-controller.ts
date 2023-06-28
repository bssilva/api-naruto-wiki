import { Request, Response } from "express";
import AppError from "../shared/appError";
import ListCharacterService from "../services/characters/list";
import FindOneCharacterService from "../services/characters/findOne";
import CreateCharacterService from "../services/characters/create";
import UpdateCharacterSerice from "../services/characters/update";
import DeleteCharacterSerice from "../services/characters/delete";

class ClansController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const listCharacterService = new ListCharacterService();
    const estado = req.query.estado?.toString();
    const sexo = req.query.sexo?.toString();
    const classificacao = req.query.classificacao?.toString();
    const nome = req.query.nome?.toString();
    const cla = req.query.cla?.toString();
    const { page = 1, limit = 10 } = req.query;

    try {
      const character = await listCharacterService.execute({
        estado,
        sexo,
        classificacao,
        nome,
        cla,
        page: Number(page), 
        limit: Number(limit)
      });
      return res.status(200).send(character);
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

    const findOneCharacterService = new FindOneCharacterService();

    try {
      const character = await findOneCharacterService.execute(id);
      return res.status(200).send(character);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { name, about, info, page } = req.body;

    let nameImages;

    if(!req.body.images){
      const { images } = req.files as { [fieldname: string]: Express.Multer.File[]; } || req.body;

      nameImages = images.map((image) => {
        return image.originalname;
      });
    }
    else nameImages = req.body.images

    const createCharacterService = new CreateCharacterService();

    try {
      const character = await createCharacterService.execute({
        name,
        about,
        info,
        page,
        images: nameImages,
      });
      return res.status(201).send(character);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { name, about, info, page } = req.body;
     
      let nameImages;

      if(!req.body.images){
        const { images } = req.files as { [fieldname: string]: Express.Multer.File[]; } || req.body;
  
        nameImages = images.map((image) => {
          return image.originalname;
        });
      }
      else nameImages = req.body.images

      const updateCharacterService = new UpdateCharacterSerice();
      const character = await updateCharacterService.execute({
        id: Number(id),
        name,
        about,
        info,
        page,
        images: nameImages,
      });

      return res.status(200).send(character);
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

    const deleteCharacterSerice = new DeleteCharacterSerice();
    try {
      const deleteCharacter = await deleteCharacterSerice.execute(Number(id));
      return res.status(200).send(deleteCharacter);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };
}

export default ClansController;
