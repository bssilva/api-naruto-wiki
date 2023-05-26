import { Request, Response } from "express";

export interface IUserControllerContract{
    // list(req: Request, res: Response): Promise<Response>  
    // create(req: Request, res: Response): Promise<Response>
    findOne(req: Request, res: Response): Promise<Response>
}