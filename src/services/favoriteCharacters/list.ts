import FavoriteCharactersRepository from "../../repository/favorite-characters-repository";
import CharacterRespository from "../../repository/characters-repository";

export default class ListFavoriteCharacterService {
  async execute(emailUser: string, page: number, limit: number) {
    const favoriteCharacterRepository = new FavoriteCharactersRepository();
    const favoriteCharacter = await favoriteCharacterRepository.list(emailUser, page, limit);

    const characterRepository = new CharacterRespository();
    let responseFavoriteClan = []

    for(const favorite of favoriteCharacter) {
      const character = await characterRepository.findOne(favorite.idCharacter);
      
      const response = {
        id: favorite.id,
        emailUser: favorite.emailUser,
        idCharacter: favorite.idCharacter,
        name: character.name,
        about: character.about,
        info: character.info,
        images: character.images,
        page: character.page,
      };
  
      responseFavoriteClan.push(response)
    }

    return responseFavoriteClan;
  }
}
