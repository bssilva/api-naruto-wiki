import { PrismaClient, users } from "@prisma/client";
import AppError from "../shared/appError";
import IResponseGet from "../interfaces/users/IResponseGet";

class UserRepository{
  private prisma = new PrismaClient();

  // async list() : Promise<IResponseGet[]> {
  //   const users = await this.prisma.users.findMany();
  //   const response = users.map((user) => {
  //     return {
  //       id: user.id,
  //       name: user.name,
  //       avatar: user.avatar,
  //       email: user.email,
  //       createdAt: user.createdAt,
  //       birth_date: user.birth_date,
  //     };
  //   });

  //   return response;
  // }

  async findOne(id: number) : Promise<IResponseGet> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    
    if (!user) throw new AppError("Usuário não encontrado", 404);

    const response = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        createdAt: user.createdAt,
        birth_date: user.birth_date
      };

    return response;
  }
  
  // async create({name, avatar, email, password, birth_date, createdAt}: any){
  //   try {
  //     const user = await this.prisma.users.create({
  //       data: {
  //         name,
  //         avatar,
  //         email,
  //         password,
  //         birth_date,
  //         createdAt,
  //       },
  //     });

  //     const response = {
  //       id: user.id,
  //       name,
  //       email,
  //     };

  //     return response;
  //   } catch (err) {
  //     throw new AppError("Email ja existente", 409);
  //   }
  // }
}

export default UserRepository;
