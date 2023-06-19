import ClansRepository from "../../repository/clans-repository";
import IRequestClan from "../../interfaces/clans/IRequestClan";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";

export default class UpdateClanService {
  async execute({ id, name, link, icon }: IRequestClan) {
    if (!id || !name || !link || !icon)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const s3Storage = new S3Storage();
    const clansRepository = new ClansRepository();

    const findClan = await clansRepository.findOne(id);

    const urlImg = await s3Storage.saveFile(icon, "icon-clan");

    const clan = await clansRepository.update({ id, name, link, icon: urlImg });

    // Deleta imagem antiga na S3
    const urlSaveImg = findClan.icon.split('/')
    const filename = urlSaveImg[urlSaveImg.length - 1]
    await s3Storage.deleteFile(filename, "icon-clan")
    
    return clan;
  }
}
