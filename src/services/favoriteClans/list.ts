import FavoriteClanRepository from "../../repository/favorite-clans-repository";

export default class ListFavoriteClanService {
  async execute() {
    const favoriteClanRepository = new FavoriteClanRepository();

    const favoriteClan = await favoriteClanRepository.list();

    return favoriteClan;
  }
}
