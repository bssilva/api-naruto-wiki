import ClansRepository from "../../repository/clans-repository";
import IRequestClan from "../../interfaces/clans/IRequestClan";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";
export default class CreateClanService {
  async execute({ name, link, icon }: IRequestClan) {
    if (!name || !link || !icon)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );
    
    const s3Storage = new S3Storage()
    const clansRepository = new ClansRepository();

    const urlImg = await s3Storage.saveFile(icon, "icon-clan")
    const clan = await clansRepository.create({ name, link, icon: urlImg });

    return clan;
  }
}
