import { Request, Response } from "express";
import AppError from "../shared/appError";
import ListClanService from "../services/clans/list";
import FindOneClanService from "../services/clans/findOne";
import CreateClanService from "../services/clans/create";
import UpdateClanService from "../services/clans/update";

class ClansController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const listClanService = new ListClanService();

    const clans = await listClanService.execute();

    return res.status(200).send({ body: clans });
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const findOneClanService = new FindOneClanService();

    try {
      const clan = await findOneClanService.execute(id);
      return res.status(200).send({ body: clan });

    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { name, link } = req.body;
    const icon = req.file?.filename
    const createClanService = new CreateClanService()
    
    try{
      const clan = await createClanService.execute({ name, link, icon })
      return res.status(201).send({ body: clan });

    }catch(err){
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { name, link, icon} = req.body

    const updateClanService = new UpdateClanService()

    try{
      const clan = await updateClanService.execute({id: Number(id), name, link, icon})
      return res.status(201).send({ body: clan });
      
    }catch (err) {

      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
      
    }
  }
}

export default ClansController;
