import FavoriteCharactersRepository from "../../repository/favorite-characters-repository";
import CharacterRespository from "../../repository/characters-repository";
import AppError from "../../shared/appError";
import IRequestFavoriteCharacters from "../../interfaces/favoriteCharacters/IRequestFavoriteCharacters";

export default class UpdateClanService {
  async execute({ id, emailUser, idCharacter }: IRequestFavoriteCharacters) {
    if (!id || !emailUser || !idCharacter)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const favoriteCharacterRepository = new FavoriteCharactersRepository();
    await favoriteCharacterRepository.findOne(id);

    const characterRepository = new CharacterRespository();
    const character = await characterRepository.findOne(idCharacter);

    const favoriteCharacter = await favoriteCharacterRepository.update({
      id,
      emailUser,
      idCharacter,
    });

    const response = {
      id: favoriteCharacter.id,
      emailUser: favoriteCharacter.emailUser,
      idCharacter: favoriteCharacter.idCharacter,
      name: character.name,
      about: character.about,
      info: character.info,
      images: character.images,
      page: character.page,
    }

    return response;
  }
}
