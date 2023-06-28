import ClansRepository from "../../repository/clans-repository";
import IRequestClan from "../../interfaces/clans/IRequestClan";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";
import { resolve } from "path";
import axios from "axios";
import fs from "fs";

export default class UpdateClanService {
  async execute({ id, name, link, icon }: IRequestClan) {
    if (!id || !name || !link)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const s3Storage = new S3Storage();

    let urlImg;
    if (icon) {
      if (icon.includes("https://") || icon.includes("http://")) {
        const splitFilename = icon.split("/");

        let [name] = splitFilename.filter(
          (file) =>
            file.includes(".svg") ||
            file.includes(".png") ||
            file.includes(".jpg") ||
            file.includes(".jpeg")
        );

        const filename = name.includes(".svg")
          ? name.replace(".svg", ".png")
          : name;

        const tempFolder = resolve(__dirname, "..", "..", "temp", filename);

        const response = await axios.get(icon, { responseType: "stream" });
        const writeStream = response.data.pipe(
          fs.createWriteStream(tempFolder)
        );
        await new Promise((resolve, reject) => {
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });

        icon = filename;
      }

      urlImg = await s3Storage.saveFile(icon, "icon-clan");
    }

    const clansRepository = new ClansRepository();

    const findClan = await clansRepository.findOne(id);

    const clan = await clansRepository.update({ id, name, link, icon: urlImg });

    // Deleta imagem antiga na S3
    const urlSaveImg = findClan.icon.split("/");
    const filename = urlSaveImg[urlSaveImg.length - 1];
    await s3Storage.deleteFile(filename, "icon-clan");

    return clan;
  }
}
