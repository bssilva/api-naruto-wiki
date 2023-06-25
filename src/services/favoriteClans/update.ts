import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import ClansRepository from "../../repository/clans-repository";
import AppError from "../../shared/appError";
import IRequestFavoriteClan from "../../interfaces/favoriteClans/IRequestFavoriteClans";

export default class UpdateClanService {
  async execute({ id, emailUser, idClan }: IRequestFavoriteClan) {
    if (!id || !emailUser || !idClan)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const favoriteClansRepository = new FavoriteClanRepository();
    await favoriteClansRepository.findOne(id);

    const clansRepository = new ClansRepository();
    await clansRepository.findOne(idClan);

    const favoriteClan = await favoriteClansRepository.update({
      id,
      emailUser,
      idClan,
    });

    return favoriteClan;
  }
}
