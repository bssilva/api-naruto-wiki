import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IRequestUser from "../interfaces/users/IRequestUser";
import IResponseUser from "../interfaces/users/IResponseUser";

class UserRepository {
  private prisma = new PrismaClient();

  async list() : Promise<IResponseUser[]> {
    const users = await this.prisma.users.findMany();
    return users;
  };

  async findOne(id: number) : Promise<IResponseUser> {
    const user = await this.prisma.users.findUnique({
      where: { id } ,
    });
    
    if (!user) throw new AppError("Usuário não encontrado", 404);

    return user;
  };
  
  async create({name, avatar, email, password, birth_date, createdAt}: IRequestUser) : Promise<IResponseUser>{
    try {
      if(!avatar) throw new AppError("Avatar do usuário é obrigatório", 400);
      
      const user = await this.prisma.users.create({
        data: { name, avatar, email, password, birth_date, createdAt }
      });

      return user;
    } catch (err) {
      throw new AppError("Email ja existente", 409);
    }
  };

  async update({id, name, avatar, email, password, birth_date, createdAt}: IRequestUser) : Promise<IResponseUser>{
    try{

      const user = await this.prisma.users.update({
        where: { id },
        data: { name, avatar, email, password, birth_date, createdAt }
      });
      
      return user;
    }catch(err){
      throw new AppError("Email ja existente", 409);
    }
  };
}

export default UserRepository;
