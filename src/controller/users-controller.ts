import { Request, Response } from "express";
import FindOneUserService from "../services/users/findOne";
import AppError from "../shared/appError";

class UserController{
  // list = async (req: Request, res: Response) => {
  //   const users = await this.userService.list();

  //   return res.status(200).send({
  //     body: { users },
  //   });
  // }; 

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const findOneUserService = new FindOneUserService()
    const id = parseInt(req.params.id);
    try {
      const user = await findOneUserService.execute(id);
      return res.status(200).send({ body: user });
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send({ body: err });
      }
      return res.status(400).send({ body: err });
    }
  };

  // create = async (req: Request, res: Response) => {
  //   try {
  //     const user = await this.userService.create({ user: req.body });
  //     return res.status(201).send({ body: user });
  //   } catch (err) {
  //     if (err instanceof AppError) {
  //       const { statusCode } = err;
  //       return res.status(statusCode).send({ body: err });
  //     }
  //     return res.status(400).send({ body: err });
  //   }
  // };

  // async update(req: Request, res: Response) {
  //   const { name, avatar, email, password, createdAt, birth_date } = req.body;
  //   const id = parseInt(req.params.id);
  //   try {
  //     const user = await usersService.put({
  //       id,
  //       name,
  //       avatar,
  //       email,
  //       password,
  //       createdAt,
  //       birth_date,
  //     });
  //     return res.status(200).send({ body: user });
  //   } catch (err) {
  //     if (err instanceof AppError) {
  //       const { statusCode } = err;
  //       return res.status(statusCode).send({ body: err });
  //     }
  //     return res.status(400).send({ body: err });
  //   }
  // }
}

export default UserController;
