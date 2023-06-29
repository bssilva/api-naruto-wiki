import CharacterRepository from "../../repository/characters-repository";
interface IRequestQueryCharacter {
  nome?: string;
  estado?: string;
  sexo?: string;
  classificacao?: string;
  cla?: string;
  page: number;
  limit: number;
}
export default class ListCharacterService {
  async execute({estado, sexo, classificacao, nome, cla, page, limit} : IRequestQueryCharacter) {
    const characterRepository = new CharacterRepository();

    let characters
    const filterOptions: any = {};
    
    if(estado) filterOptions.estado = estado;
    if(sexo) filterOptions.sexo = sexo;
    if(nome) filterOptions.name = { contains: nome };
    if(classificacao) filterOptions.classificacao = classificacao;
    if(cla) filterOptions.clan = cla;

    characters = await characterRepository.list({filterOptions}, page, limit);

    characters = characters.map((character) => {
      character.about = character.about.length === 1 ? JSON.parse(character.about[0]) : character.about;
      return character;
    });

    return characters
  }

}
