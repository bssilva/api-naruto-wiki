import ClansRepository from "../../repository/clans-repository";
import CharacterRepository from "../../repository/characters-repository";
import AppError from "../../shared/appError";

export default class FindOneClanService{
    async execute(id: string){
        
        if(!parseInt(id)) throw new AppError("Dados inválidos! O ID do clan deve ser um valor numérico inteiro.", 406);
    
        const newId = parseInt(id);
         
        const clansRepository = new ClansRepository();
        const clan = await clansRepository.findOne(newId);

        const filterOptions: any = {};
        const charactersRepository = new CharacterRepository();
        const characters = await charactersRepository.list(filterOptions)

        let response = [];
        
        // for(const character of characters){
        //     const infoJson = character.info && JSON.parse(character.info.toString());
        //     character.info = infoJson;

        //     if(!infoJson["Clã"]) return

        //     let nameCla = infoJson.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remover acento
            
        //     if(nameCla === clan.name){
        //         response.push()
        //     }

        // }
        // if(clan)
        
        return clan;
    }
}