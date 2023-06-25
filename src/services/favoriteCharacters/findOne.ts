import FavoriteCharactersRepository from "../../repository/favorite-characters-repository";
import CharacterRespository from "../../repository/characters-repository";
import AppError from "../../shared/appError";

export default class FindOneFavoriteCharacterService {
  async execute(id: string) {
    if (!parseInt(id))
      throw new AppError(
        "Dados inválidos! O ID deve ser um valor numérico inteiro.",
        406
      );

    const newId = parseInt(id);

    const favoriteCharacterRepository = new FavoriteCharactersRepository();
    const favoriteCharacter = await favoriteCharacterRepository.findOne(newId);

    const characterRepository = new CharacterRespository();
    const character = await characterRepository.findOne(favoriteCharacter.idCharacter);

    const response = {
      id: favoriteCharacter.id,
      emailUser: favoriteCharacter.emailUser,
      idCharacter: favoriteCharacter.idCharacter,
      name: character.name,
      about: character.about,
      info: character.info,
      images: character.images,
      page: character.page,
    };

    return response;
  }
}
