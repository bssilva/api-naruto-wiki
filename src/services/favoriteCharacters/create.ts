import FavoriteCharactersRepository from "../../repository/favorite-characters-repository";
import CharacterRespository from "../../repository/characters-repository";
import AppError from "../../shared/appError";
import IRequestFavoriteCharacters from "../../interfaces/favoriteCharacters/IRequestFavoriteCharacters";

export default class CreateFavoriteCharacterService {
  async execute({
    idCharacter,
    emailUser
  }: IRequestFavoriteCharacters) {
    if (!idCharacter || !emailUser)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const characterRepository = new CharacterRespository();
    const character = await characterRepository.findOne(idCharacter);
    
    const favoriteCharacterRepository = new FavoriteCharactersRepository();
    const favoriteCharacter = await favoriteCharacterRepository.create({
      idCharacter,
      emailUser,
    });

    const response = {
      id: favoriteCharacter.id,
      emailUser: favoriteCharacter.emailUser,
      idClan: favoriteCharacter.idCharacter,
      name: character.name,
      about: character.about,
      info: character.info,
      images: character.images,
      page: character.page,
    }

    return response;
  }
}
