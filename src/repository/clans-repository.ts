import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IResponseClan from "../interfaces/clans/IResponseClan";
import IRequestClan from "../interfaces/clans/IRequestClan";

class ClansRepository {
  private prisma = new PrismaClient();

  async list(): Promise<IResponseClan[]> {
    const clans = await this.prisma.clans.findMany();

    return clans;
  }

  async findOne(id: number): Promise<IResponseClan> {
    const clan = await this.prisma.clans.findUnique({
      where: { id },
    });

    if (!clan) throw new AppError("Clan não encontrado.", 404);

    return clan;
  }

  async create({ name, link, icon }: IRequestClan): Promise<IResponseClan> {
    try{
      if(!icon) throw new AppError("Icone do clan obrigatório", 400)

      const clan = await this.prisma.clans.create({
        data: { name, link, icon },
      });
      
      return clan

    }catch(err){
      throw new AppError("Nome de Clan ja existente.", 409)
    }

  }

  async update({ id, name, link, icon }: IRequestClan) : Promise<IResponseClan>{
    try{
      const clan = await this.prisma.clans.update({
        where: { id },
        data: { name, link, icon }
      })
      return clan

    }catch(err){
      throw new AppError("Nome de clan ja existente.", 409)
    }
  }
}

export default ClansRepository;
