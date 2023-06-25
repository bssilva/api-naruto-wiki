import CharacterRepository from "../../repository/characters-repository";
import AppError from "../../shared/appError";

export default class DeleteCharacterService {
  async execute(id: number) {
    if (!id)
      throw new AppError(
        "Dados inválidos! O ID deve ser um valor numérico inteiro.",
        406
      );

    const characterRepository = new CharacterRepository();
    await characterRepository.findOne(id);
    
    const character = await characterRepository.delete(id);

    return character;
  }
}
