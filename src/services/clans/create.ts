import ClansRepository from "../../repository/clans-repository";
import IRequestClan from "../../interfaces/clans/IRequestClan";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";
import { resolve } from "path";
import axios from "axios";
import fs from "fs";

export default class CreateClanService {
  async execute({ name, link, icon }: IRequestClan) {
    if (!name || !link || !icon)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );
    
    if(icon.includes("https://") || icon.includes("http://")){
        const splitFilename = icon.split("/")
        const [ filename, ] = splitFilename.filter((name) => name.includes('.svg'))

        const tempFolder = resolve(__dirname, "..", "..", "temp", filename);

        const response = await axios.get(icon, { responseType: 'stream' });
        const writeStream = response.data.pipe(fs.createWriteStream(tempFolder));
          await new Promise((resolve, reject) => {
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });
        
        icon = filename;
    }

    const s3Storage = new S3Storage();
    const clansRepository = new ClansRepository();

    const urlImg = await s3Storage.saveFile(icon, "icon-clan");
    
    const clan = await clansRepository.create({ name, link, icon: urlImg });

    return clan;
  }
}
