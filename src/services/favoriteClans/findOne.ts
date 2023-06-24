import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import ClansRepository from "../../repository/clans-repository";
import AppError from "../../shared/appError";

export default class FindOneFavoriteClanService {
  async execute(id: string) {
    if (!parseInt(id))
      throw new AppError(
        "Dados inválidos! O ID deve ser um valor numérico inteiro.",
        406
      );

    const newId = parseInt(id);

    const favoriteClanRepository = new FavoriteClanRepository();
    const favoriteClan = await favoriteClanRepository.findOne(newId);

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
