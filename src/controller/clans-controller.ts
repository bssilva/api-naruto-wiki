import { Request, Response } from "express";
import AppError from "../shared/appError";
import ListClanService from "../services/clans/list";
import FindOneClanService from "../services/clans/findOne";

class ClansController {
  list = async (req: Request, res: Response): Promise<Response> => {
    const listClanService = new ListClanService();

    const clans = await listClanService.execute();

    return res.status(200).send({
      body: { clans },
    });
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const findOneClanService = new FindOneClanService();

    try{
        const clan = await findOneClanService.execute(id);
        return res.status(200).send({
            body: { clan },
        });

    }catch (err) {
        if (err instanceof AppError) {
          const { statusCode } = err;
          return res.status(statusCode).send({ body: err });
        }
        return res.status(400).send({ body: err });
      
      }
  };
}

export default ClansController;
