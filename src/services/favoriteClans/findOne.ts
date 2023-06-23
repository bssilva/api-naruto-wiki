import FavoriteClanRepository from "../../repository/favorite-clans-repository";
import AppError from "../../shared/appError";

export default class FindOneFavoriteClanService{
    async execute(id: string){
        
        if(!parseInt(id)) throw new AppError("Dados inválidos! O ID deve ser um valor numérico inteiro.", 406);
    
        const newId = parseInt(id);
         
        const favoriteClanRepository = new FavoriteClanRepository();

        const favoriteClan = await favoriteClanRepository.findOne(newId);
        
        return favoriteClan;
    }
}