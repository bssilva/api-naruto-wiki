import CharacterRepository from "../../repository/characters-repository";

export default class ListCharacterService {
  async execute() {
    const characterRepository = new CharacterRepository();

    let characters = await characterRepository.list();

    characters = characters.map((character) => {
      character.info = JSON.parse(character.info);
      character.about = JSON.parse(character.about[0]);
      return character;
    });

    return characters;
  }
}
