import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IRequestFavoriteClan from "../interfaces/favoriteClans/IRequestFavoriteClans";
import IResponseFavoriteClan from "../interfaces/favoriteClans/IResponseFavoriteClans";

class ClansRepository {
  private prisma = new PrismaClient();

  async create({idClan, idUser, name, link, icon} : IRequestFavoriteClan) : Promise<IResponseFavoriteClan> {
    try{
      const favoriteClan = await this.prisma.favoriteClans.create({
        data: { idClan, idUser, name, link, icon }
      });
      return favoriteClan;

    }catch(err){
      throw new AppError("Este clan ja está nos seus favoritos", 409);
    }
  }
}

export default ClansRepository;
