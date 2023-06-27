import UserRepository from "../../repository/users-repository";
import IRequestUser from "../../interfaces/users/IRequestUser";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";
import * as argon2 from "argon2";
import { extractRoleFromToken, extractEmailFromToken } from "../../utils/jwtUtils";
import { resolve } from "path";
import axios from "axios";
import fs from "fs";
export default class UpdateUserService {
  async execute({id, name, avatar, email, password, birth_date, createdAt, role, authorization}: IRequestUser) {
    if(!id || !name || !avatar || !email || !password || !birth_date || !id) 
      throw new AppError("Necessário enviar todos os campos obrigatórios.", 400);
    
    password = await argon2.hash(password);

    createdAt ? 
        createdAt = new Date(createdAt) :
        createdAt = new Date(); 
    
    birth_date = new Date(birth_date);
    
    if(avatar.includes("https://")){
        const splitFilename = avatar.split("/")
        const filename = splitFilename[splitFilename.length - 1]

        const tempFolder = resolve(__dirname, "..", "..", "temp", filename);

        const response = await axios.get(avatar, { responseType: 'stream' });
        await response.data.pipe(fs.createWriteStream(tempFolder));

        avatar = filename;
    }

    const getRole = authorization && extractRoleFromToken(authorization)

    if(role && role === "Administrator" && getRole !== 'Administrator')
      throw new AppError("Sem permissao para atualizar usuarios 'Admin'", 403);
    
    const userRepository = new UserRepository();
    const findUser = await userRepository.findOneById(id)

    if(getRole == "User" && authorization){
      const emailUser = extractEmailFromToken(authorization)
      if(findUser.email !== emailUser)
        throw new AppError("Sem permissao para atualizar outros usuarios", 403);
    }
    
    const s3Storage = new S3Storage();
    const urlImg = await s3Storage.saveFile(avatar, "avatar-user-api");

    const user = await userRepository.update({id, name, avatar: urlImg, email, password, birth_date, createdAt, role});
    
    // Deleta imagem antiga na S3
    const urlSaveImg = findUser.avatar.split('/')
    const filename = urlSaveImg[urlSaveImg.length - 1]
    await s3Storage.deleteFile(filename, "avatar-user-api")

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      birth_date: user.birth_date,
      role: user.role
    };

    return response;
  }
}
