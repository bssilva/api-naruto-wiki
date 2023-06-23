import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import ClansRepository from "../../repository/clans-repository";
import UserRepository from "../../repository/users-repository";
import AppError from "../../shared/appError";

interface IRequestPostFavoriteClan {
  idClan: number,
  idUser: number,
}

export default class CreateFavoriteClanService {
  async execute({
    idClan,
    idUser
  }: IRequestPostFavoriteClan) {
    if (!idClan || !idUser)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const clansRepository = new ClansRepository();
    const clan = await clansRepository.findOne(idClan);
    
    const userRepository = new UserRepository();
    await userRepository.findOneById(idUser);

    const favoriteClansRepository = new FavoriteClanRepository();
    const favoriteClan = await favoriteClansRepository.create({
      idClan,
      idUser,
      name: clan.name,
      icon: clan.icon,
      link: clan.link,
    });

    return favoriteClan;
  }
}
