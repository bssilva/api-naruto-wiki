import ClansRepository from "../../repository/clans-repository";
import IRequestClan from "../../interfaces/clans/IRequestClan";
import AppError from "../../shared/appError";

export default class CreateClanService {
  async execute({ name, link, icon }: IRequestClan) {
    if (!name || !link || !icon)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const clansRepository = new ClansRepository();

    const clan = await clansRepository.create({ name, link, icon });

    return clan;
  }
}
