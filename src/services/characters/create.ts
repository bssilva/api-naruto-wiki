import CharacterRepository from "../../repository/characters-repository";
import IRequestCharacter from "../../interfaces/characters/IRequestCharacter";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";
import { resolve } from "path";
import axios from "axios";
import fs from "fs";
export default class CreateCharacterService {
  async execute({ name, about, info, page, images }: IRequestCharacter) {
    if (!name || !about || !info || !page)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );
    
    const s3Storage = new S3Storage();
    const characterRepository = new CharacterRepository();

    let urlImages = []
    let filename;

    for(const image of images){
      filename = image;
      if (image.includes("https://") || image.includes("http://")) {
        const splitFilename = image.split("/");

        const name = splitFilename[splitFilename.length - 1];

        filename = name.includes(".webp")
          ? name.replace(".webp", ".png")
          : name;
          
        const tempFolder = resolve(__dirname, "..", "..", "temp", filename);

        const response = await axios.get(image, { responseType: "stream" });

        const writeStream = response.data.pipe(
          fs.createWriteStream(tempFolder)
        );

        await new Promise((resolve, reject) => {
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });
      }

      const url = await s3Storage.saveFile(filename, "images-characters");
      urlImages.push(url)
    }

    let character = await characterRepository.create({
      name,
      about,
      info: typeof info === "string" ? JSON.parse(info) : info,
      page,
      images: urlImages,
    });

    character.about = character.about.length === 1 ? JSON.parse(character.about[0]) : character.about;

    return character;
  }
}
