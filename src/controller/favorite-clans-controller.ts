import { Request, Response } from "express";
import AppError from "../shared/appError";
import CreateFavoriteClanService from "../services/favoriteClans/create";
import FindOneFavoriteClanService from "../services/favoriteClans/findOne";
import ListFavoriteClanService from "../services/favoriteClans/list";
import UpdateFavoriteClanService from "../services/favoriteClans/update";

class FavoriteClansController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const listFavortieClanService = new ListFavoriteClanService();

    const listFavortieClan = await listFavortieClanService.execute();

    return res.status(200).send({ body: listFavortieClan });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { idUser, idClan } = req.body;

    const createFavoriteClanService = new CreateFavoriteClanService()
    
    try{
      const favoriteClan = await createFavoriteClanService.execute({ idUser, idClan })
      return res.status(201).send({ body: favoriteClan });

    }catch(err){
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const findOneFavoriteClanService = new FindOneFavoriteClanService();

    try {
      const favoriteClan = await findOneFavoriteClanService.execute(id);
      return res.status(200).send({ body: favoriteClan });

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
    const { idUser, idClan } = req.body;

    const updateFavoriteClanService = new UpdateFavoriteClanService();

    try{
      const favoriteClan = await updateFavoriteClanService.execute({id: Number(id), idUser, idClan});
      return res.status(201).send({ body: favoriteClan });
      
    }catch (err) {

      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
      
    }
  }
}

export default FavoriteClansController;
