import CharacterRepository from "../../repository/characters-repository";
interface IRequestQueryCharacter {
  nome?: string;
  estado?: string;
  sexo?: string;
  classificacao?: string;
  cla?: string;
}
export default class ListCharacterService {
  async execute({estado, sexo, classificacao, nome, cla} : IRequestQueryCharacter) {
    const characterRepository = new CharacterRepository();

    let characters
    const filterOptions: any = {};
    
    if(estado) filterOptions.estado = estado;
    if(sexo) filterOptions.sexo = sexo;
    if(nome) filterOptions.name = { contains: nome };
    if(classificacao) filterOptions.classificacao = classificacao;
    if(cla) filterOptions.cla = cla;

    characters = await characterRepository.list({filterOptions});

    characters = characters.map((character) => {
      character.about = JSON.parse(character.about[0]);
      return character;
    });

    return characters
  }

}
