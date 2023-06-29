import AppError from "../../shared/appError";
import CharacterRepository from "../../repository/characters-repository";
import ClanRepository from "../../repository/clans-repository";

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
        
    const infoJson = character.info && typeof character.info === 'string' ? JSON.parse(character.info) : character.info;
    character.info = infoJson;
    character.about = character.about.length === 1 ? JSON.parse(character.about[0]) : character.about;
    
    if("Clã" in infoJson){
      const clanRepository = new ClanRepository()
      const clan = await clanRepository.findOneByName(infoJson['Clã'])

      return { character, clan }
    }
    
    return character;
  }
}
