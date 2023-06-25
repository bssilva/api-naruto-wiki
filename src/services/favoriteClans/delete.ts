import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import ClansRepository from "../../repository/clans-repository";
import AppError from "../../shared/appError";

export default class FindOneFavoriteClanService {
  async execute(id: number, emailUser: string) {
    if (!id)
      throw new AppError(
        "Dados inválidos! O ID deve ser um valor numérico inteiro.",
        406
      );

    const favoriteClanRepository = new FavoriteClanRepository();
    const findOneFavoriteClan = await favoriteClanRepository.findOne(id);

    if (findOneFavoriteClan.emailUser !== emailUser)
      throw new AppError("Este clan nao esta nos seus favoritos", 400);

    const favoriteClan = await favoriteClanRepository.delete(id);

    const clansRepository = new ClansRepository();
    const clan = await clansRepository.findOne(favoriteClan.idClan);

    const response = {
      id: favoriteClan.id,
      emailUser: favoriteClan.emailUser,
      idClan: favoriteClan.idClan,
      name: clan.name,
      icon: clan.icon,
      link: clan.link,
    };

    return response;
  }
}
