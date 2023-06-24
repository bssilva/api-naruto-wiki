import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import ClansRepository from "../../repository/clans-repository";
import AppError from "../../shared/appError";
import IRequestFavoriteClan from "../../interfaces/favoriteClans/IRequestFavoriteClans";
export default class CreateFavoriteClanService {
  async execute({
    idClan,
    emailUser
  }: IRequestFavoriteClan) {
    if (!idClan || !emailUser)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const clansRepository = new ClansRepository();
    const clan = await clansRepository.findOne(idClan);
    
    const favoriteClansRepository = new FavoriteClanRepository();
    const favoriteClan = await favoriteClansRepository.create({
      idClan,
      emailUser,
    });

    const response = {
      id: favoriteClan.id,
      emailUser: favoriteClan.emailUser,
      idClan: favoriteClan.idClan,
      name: clan.name,
      icon: clan.icon,
      link: clan.link,
    }

    return response;
  }
}
