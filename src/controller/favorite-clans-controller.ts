import { Request, Response } from "express";
import AppError from "../shared/appError";
import CreateFavoriteClanService from "../services/favoriteClans/create";

class FavoriteClansController {
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
}

export default FavoriteClansController;
