import { Request, Response } from "express";
import AppError from "../shared/appError";
import FindOneUserService from "../services/users/findOne";
import ListUserService from "../services/users/list";
import CreateUserService from "../services/users/create";
import UpdateUserService from "../services/users/update";
import LoginUserService from "../services/users/login";
import DeleteUserService from "../services/users/delete";

class UserController{
  list = async (req: Request, res: Response): Promise<Response> => {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return res.status(200).send(users);
  }; 
 
  findOne = async (req: Request, res: Response): Promise<Response> => {
    const findOneUserService = new FindOneUserService();
    
    const { id } = req.params;

    try {
      const user = await findOneUserService.execute(id);
      return res.status(200).send(user);
    
    } catch (err) {
    
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password, birth_date, createdAt, role } = req.body;
      const avatar = req.file?.filename;
      const { authorization } = req.headers;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({ name, avatar, email, password, createdAt, birth_date, role, authorization });
      
      return res.status(201).send(user);
    
    } catch (err) {
    
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    
    }
  };

  update = async (req: Request, res: Response) : Promise<Response> => {
    try {
      const { name, email, password, birth_date, createdAt, role } = req.body;
      const { id } = req.params
      const { authorization } = req.headers;
      const avatar = req.file?.filename;
      
      const updateUserService = new UpdateUserService()
      const user = await updateUserService.execute({ id: Number(id), name, avatar, email, password, createdAt, birth_date, role, authorization });

      return res.status(200).send(user);

    } catch (err) {

      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
      
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body
    
    const loginUserService = new LoginUserService()
    
    try{
      const token = await loginUserService.execute(email, password)
      return res.status(200).send(token);
    }catch(err){
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const deleteUserService = new DeleteUserService();
    try {
      const deleteClan = await deleteUserService.execute(Number(id));
      return res.status(200).send(deleteClan);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode } = err;
        return res.status(statusCode).send(err);
      }
      return res.status(400).send(err);
    }
  };
}

export default UserController;
