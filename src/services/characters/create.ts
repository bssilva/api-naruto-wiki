import CharacterRepository from "../../repository/characters-repository";
import IRequestCharacter from "../../interfaces/characters/IRequestCharacter";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";

export default class CreateCharacterService {
  async execute({ name, about, info, page, images }: IRequestCharacter) {
    if (!name || !about || !info || !page || !images)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const s3Storage = new S3Storage();
    const characterRepository = new CharacterRepository();

    let urlImages = []
    
    for(const image of images){
      const url = await s3Storage.saveFile(image, "images-characters");
      urlImages.push(url)
    }

    let character = await characterRepository.create({
      name,
      about,
      info,
      page,
      images: urlImages,
    });

    character.info = JSON.parse(character.info)
    character.about = JSON.parse(character.about[0])

    return character;
  }
}
