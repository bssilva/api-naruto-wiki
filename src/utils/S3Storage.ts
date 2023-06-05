import aws, { S3 } from "aws-sdk";
import mime from "mime";
import { resolve } from "path";
import multerConfig from "../config/multer";
import AppError from "../shared/appError";
import fs from "fs";

class S3Storage {
  private client: S3;
  private defaultBucket: string;

  constructor() {
    this.client = new aws.S3({
      region: "sa-east-1",
    });
    this.defaultBucket = "wiki-naruto"
  };

  async getUrlImgBucket(filename: string, folderBucket: string) : Promise<string> {
    const params = { 
      Bucket: `${this.defaultBucket}/${folderBucket}`, 
      Key: filename
    };
    
    let urlImg = this.client.getSignedUrl('getObject', params);
    urlImg = urlImg.split('?')[0];

    return urlImg
  }

  async saveFile(filename: string, folderBucket: string): Promise<string> {
    const acceptableImageFormat = ['jpeg', 'jpg', 'png'];

    if(!acceptableImageFormat.some(format => filename.toLowerCase().includes(format)))
      throw new AppError("Formato de imagem inválido. Formatos válidos 'jpg', 'jpeg', 'png'", 409);

    const originalPath = resolve(multerConfig.directory, filename);
    const contentType = mime.getType(originalPath);

    if (!contentType) throw new AppError("Imagem não encontrada.", 400);

    const fileContent = await fs.promises.readFile(originalPath);

    const params = {
      Bucket: `${this.defaultBucket}/${folderBucket}`,
      Key: filename,
      ACL: "public-read",
      Body: fileContent,
      ContentType: contentType,
    }

    await this.client.putObject(params).promise();
    await fs.promises.unlink(originalPath);

    const urlImg = this.getUrlImgBucket(filename, folderBucket)

    return urlImg;
  }

  async deleteFile(filename: string, folderBucket: string) : Promise<void> {
    const params = { 
      Bucket: `${this.defaultBucket}/${folderBucket}`, 
      Key: filename
    };
    
    this.client.deleteObject(params).promise()
  }
}

export default S3Storage;
