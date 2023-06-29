import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IResponseClan from "../interfaces/clans/IResponseClan";
import IRequestClan from "../interfaces/clans/IRequestClan";
import S3Storage from "../utils/S3Storage";

class ClansRepository {
  private prisma = new PrismaClient();

  async list(page: number, limit: number): Promise<IResponseClan[]> {
    const clans = await this.prisma.clans.findMany({
      skip: (page - 1) * limit, 
      take: limit, 
    });
    return clans;
  };

  async findOne(id: number): Promise<IResponseClan> {
    const clan = await this.prisma.clans.findUnique({
      where: { id },
    });

    if (!clan) throw new AppError("Clan não encontrado.", 404);

    return clan;
  };

  async findOneByName(name: string): Promise<IResponseClan | Object> {
    const clan = await this.prisma.clans.findUnique({
      where: { name },
    });

    return clan || {};
  };

  async create({ name, link, icon = "" }: IRequestClan): Promise<IResponseClan> {
    try{
      const clan = await this.prisma.clans.create({
        data: { name, link, icon },
      });
      
      return clan;

    }catch(err){
      const s3Storage = new S3Storage();
      icon && await s3Storage.rollbackImg(icon, "icon-clan");

      throw new AppError("Nome de Clan ja existente.", 409);
    }

  };

  async update({ id, name, link, icon = "" }: IRequestClan) : Promise<IResponseClan>{
    try{
      const clan = await this.prisma.clans.update({
        where: { id },
        data: { name, link, icon }
      });
      return clan;

    }catch(err){
      const s3Storage = new S3Storage();
      icon && await s3Storage.rollbackImg(icon, "icon-clan");

      throw new AppError("Nome de clan ja existente.", 409);
    }
  };

  async delete(id: number): Promise<IResponseClan> {
    const clan = await this.prisma.clans.delete({
      where: { id },
    });
    return clan;
  }
}

export default ClansRepository;
