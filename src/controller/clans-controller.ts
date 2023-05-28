import { Request, Response } from "express";
import ListClanService from "../services/clans/list";

class ClansController{
  list = async (req: Request, res: Response): Promise<Response> => {
    const listClanService = new ListClanService()

    const clans = await listClanService.execute();

    return res.status(200).send({
      body: { clans },
    });
  }; 
 
}

export default ClansController;
