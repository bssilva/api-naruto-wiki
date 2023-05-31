import UserRepository from "../../repository/users-repository";
import IRequestUser from "../../interfaces/users/IRequestUser";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";
import * as argon2 from "argon2";

export default class UpdateUserService {
  async execute({id, name, avatar, email, password, birth_date, createdAt}: IRequestUser) {
    if(!id || !name || !avatar || !email || !password || !birth_date || !id) 
      throw new AppError("Necessário enviar todos os campos obrigatórios.", 400);
    
    password = await argon2.hash(password);

    createdAt ? 
        createdAt = new Date(createdAt) :
        createdAt = new Date(); 
    
    birth_date = new Date(birth_date);
    
    const s3Storage = new S3Storage();
    const userRepository = new UserRepository();
    
    const urlImg = await s3Storage.saveFile(avatar, "avatar-user-api");

    const user = await userRepository.update({id, name, avatar: urlImg, email, password, birth_date, createdAt});
    
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      birth_date: user.birth_date
    };

    return response;
  }
}
