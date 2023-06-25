import FavoriteCharacterRepository from "../../repository/favorite-characters-repository";
import CharacterRepository from "../../repository/characters-repository";
import AppError from "../../shared/appError";

export default class FindOneFavoriteClanService {
  async execute(id: number, emailUser: string) {
    if (!id)
      throw new AppError(
        "Dados inválidos! O ID deve ser um valor numérico inteiro.",
        406
      );

    const favoriteCharacterRepository = new FavoriteCharacterRepository();
    const findOneFavoriteCharacter = await favoriteCharacterRepository.findOne(
      id
    );

    if (findOneFavoriteCharacter.emailUser !== emailUser)
      throw new AppError("Este personagem nao esta nos seus favoritos", 400);

    const favoriteCharacter = await favoriteCharacterRepository.delete(id);

    const characterRepository = new CharacterRepository();
    const character = await characterRepository.findOne(
      favoriteCharacter.idCharacter
    );

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
