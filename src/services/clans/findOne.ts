import ClansRepository from "../../repository/clans-repository";
import AppError from "../../shared/appError";

export default class FindOneClanService{
    async execute(id: string){
        
        if(!parseInt(id)) throw new AppError("Dados inválidos! O ID do clan deve ser um valor numérico inteiro.", 406) 
    
        const newId = parseInt(id)
         
        const clansRepository = new ClansRepository()

        const clan = clansRepository.findOne(newId)
        
        return clan
    }
}