import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IResponseClan from "../interfaces/clans/IResponseClan";

class ClansRepository {
  private prisma = new PrismaClient();

  async list() : Promise<IResponseClan[]> {
    const clans = await this.prisma.clans.findMany();
   
    return clans;
  }

  async findOne(id: number) : Promise<IResponseClan> {
    const clan = await this.prisma.clans.findUnique({
      where: { id } ,
    });

    if(!clan) throw new AppError("Clan não encontrado.", 404)

    return clan
  }

}

export default ClansRepository;
