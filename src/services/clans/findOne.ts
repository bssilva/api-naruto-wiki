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
        filterOptions.clan = clan.name

        const charactersRepository = new CharacterRepository();
        const characters = await charactersRepository.list({filterOptions}, 1, 100)

        return {clan, characters};
    }
}