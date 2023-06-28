import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IRequestFavoriteClan from "../interfaces/favoriteClans/IRequestFavoriteClans";
import IResponseFavoriteClan from "../interfaces/favoriteClans/IResponseFavoriteClans";

class ClansRepository {
  private prisma = new PrismaClient();

  async list(emailUser: string, page: number, limit: number): Promise<IResponseFavoriteClan[]> {
    const favoriteClans = await this.prisma.favoriteClans.findMany({
      where: { emailUser },
      skip: (page - 1) * limit, 
      take: limit, 
    });
    return favoriteClans;
  }

  async findOne(id: number): Promise<IResponseFavoriteClan> {
    const favoriteClan = await this.prisma.favoriteClans.findUnique({
      where: { id },
    });

    if (!favoriteClan) throw new AppError("Clan favorito não encontrado.", 404);

    return favoriteClan;
  }

  async create({
    idClan,
    emailUser,
  }: IRequestFavoriteClan): Promise<IResponseFavoriteClan> {
    try {
      const favoriteClan = await this.prisma.favoriteClans.create({
        data: { idClan, emailUser },
      });

      return favoriteClan;
    } catch (err) {
      throw new AppError("Este clan ja está nos seus favoritos", 409);
    }
  }

  async update({
    id,
    idClan,
    emailUser,
  }: IRequestFavoriteClan): Promise<IResponseFavoriteClan> {
    try {
      const favoriteClan = await this.prisma.favoriteClans.update({
        where: { id },
        data: { idClan, emailUser },
      });
      return favoriteClan;
    } catch (err) {
      throw new AppError("Este clan ja está nos seus favoritos", 409);
    }
  }

  async delete(id: number): Promise<IResponseFavoriteClan> {
    const favoriteClan = await this.prisma.favoriteClans.delete({
      where: { id },
    });
    return favoriteClan;
  }
}

export default ClansRepository;
