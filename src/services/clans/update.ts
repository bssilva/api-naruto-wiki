import ClansRepository from "../../repository/clans-repository";
import IRequestClan from "../../interfaces/clans/IRequestClan";
import AppError from "../../shared/appError";

export default class UpdateClanService {
  async execute({ id, name, link, icon }: IRequestClan) {
    if (!id || !name || !link || !icon)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const clansRepository = new ClansRepository();
    
    await clansRepository.findOne(id)

    const clan = await clansRepository.update({id, name, link, icon });

    return clan;
  }
}
