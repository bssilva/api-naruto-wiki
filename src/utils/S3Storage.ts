import aws, { S3 } from "aws-sdk"
import mime from "mime"
import { resolve } from "path"
import multerConfig from "../config/multer"
import AppError from "../shared/appError"
import fs from "fs"

class S3Storage{
    private client: S3

    constructor(){
        this.client = new aws.S3({
            region: "us-east-1"
        })
    }

    async saveFile(filename: string, bucket: string) : Promise<void> {
        const originalPath = resolve(multerConfig.directory, filename)
        const contentType = mime.getType(originalPath)

        if(!contentType) throw new AppError("Imagem não encontrada.", 400)

        const fileContent = await fs.promises.readFile(originalPath)

        await this.client.putObject({
            Bucket: "icon-clan",
            Key: filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: contentType
        })

        await fs.promises.unlink(originalPath)
    }
}

export default S3Storage