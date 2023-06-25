import CharacterRepository from "../../repository/characters-repository";
import IRequestCharacter from "../../interfaces/characters/IRequestCharacter";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";

export default class UpdateCharacterService {
  async execute({ id, name, about, info, page, images }: IRequestCharacter) {
    if (!id || !name || !about || !info || !page || !images)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const s3Storage = new S3Storage();
    const characterRepository = new CharacterRepository();

    const findCharacter = await characterRepository.findOne(id);

    let urlImages = [];

    for (const image of images) {
      const url = await s3Storage.saveFile(image, "images-characters");
      urlImages.push(url);
    }

    let character = await characterRepository.update({
      id,
      name,
      about,
      info: JSON.parse(info),
      page,
      images: urlImages,
    });

    character.about = JSON.parse(character.about[0]);

    // Deleta imagem antiga na S3
    for (const image of findCharacter.images) {
        const urlSaveImg = image.split("/");
        const filename = urlSaveImg[urlSaveImg.length - 1];
        await s3Storage.deleteFile(filename, "images-characters");
      }

    return character;
  }
}
