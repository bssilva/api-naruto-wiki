import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import ClansRepository from "../../repository/clans-repository";
import UserRepository from "../../repository/users-repository";
import AppError from "../../shared/appError";

interface IRequestPutFavoriteClan {
  id: number;
  idClan: number;
  idUser: number;
}

export default class UpdateClanService {
  async execute({ id, idUser, idClan }: IRequestPutFavoriteClan) {
    if (!id || !idUser || !idClan)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const clansRepository = new ClansRepository();
    await clansRepository.findOne(idClan);

    const userRepository = new UserRepository();
    await userRepository.findOneById(idUser);

    const favoriteClansRepository = new FavoriteClanRepository();

    const findOneFavoriteClan = await favoriteClansRepository.findOne(id);

    const favoriteClan = await favoriteClansRepository.update({
      id,
      idUser,
      idClan,
      name: findOneFavoriteClan.name,
      icon: findOneFavoriteClan.icon,
      link: findOneFavoriteClan.link,
    });

    return favoriteClan;
  }
}
