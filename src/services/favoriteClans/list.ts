import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import ClansRepository from "../../repository/clans-repository";

export default class ListFavoriteClanService {
  async execute(emailUser: string) {
    const favoriteClanRepository = new FavoriteClanRepository();
    const favoriteClan = await favoriteClanRepository.list(emailUser);

    const clansRepository = new ClansRepository();
    let responseFavoriteClan = []

    for(const favorite of favoriteClan) {
      const clan = await clansRepository.findOne(favorite.idClan);
      
      const response = {
        id: favorite.id,
        emailUser: favorite.emailUser,
        idClan: favorite.idClan,
        name: clan.name,
        link: clan.link,
        icon: clan.icon,
      };

      responseFavoriteClan.push(response)
    }

    return responseFavoriteClan;
  }
}
