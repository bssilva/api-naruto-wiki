import ClanRepository from "../../repository/clans-repository";
import AppError from "../../shared/appError";

export default class DeleteClanService {
  async execute(id: number) {
    if (!id)
      throw new AppError(
        "Dados inválidos! O ID deve ser um valor numérico inteiro.",
        406
      );

    const clanRepository = new ClanRepository();
    await clanRepository.findOne(id);
    
    const clan = await clanRepository.delete(id);

    return clan;
  }
}
