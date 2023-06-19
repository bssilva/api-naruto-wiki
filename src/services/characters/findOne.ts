import AppError from "../../shared/appError";
import CharacterRepository from "../../repository/characters-repository";

export default class FindOneCharacterService {
  async execute(id: string) {
    if (!parseInt(id))
      throw new AppError(
        "Dados inválidos! O ID do personagem deve ser um valor numérico inteiro.",
        406
      );

    const newId = parseInt(id);

    const characterRepository = new CharacterRepository();

    const character = await characterRepository.findOne(newId);
    
    character.info = JSON.parse(character.info);
    character.about = JSON.parse(character.about[0]);
    
    return character;
  }
}
