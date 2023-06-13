import CharacterRepository from "../../repository/characters-repository";

export default class ListCharacterService {
  async execute() {
    const characterRepository = new CharacterRepository();

    const clans = await characterRepository.list();

    return clans;
  }
}
