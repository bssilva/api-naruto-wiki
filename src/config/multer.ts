import multer from "multer";
import { resolve } from "path";
import { randomBytes } from "crypto";

const tempFolder = resolve(__dirname, "..", "temp");

export default {
    directory: tempFolder,
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback){
            const fileHash = randomBytes(10).toString('hex')
            
            const filename = `${fileHash}-${file.originalname}`
            
            return callback(null, filename)
        }
    })
};