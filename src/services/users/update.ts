import UserRepository from "../../repository/users-repository";
import IRequestUser from "../../interfaces/users/IRequestUser";
import AppError from "../../shared/appError";
import * as argon2 from "argon2";

export default class UpdateUserService {
  async execute({id, name, avatar, email, password, birth_date, createdAt}: IRequestUser) {
    if(!id || !name || !avatar || !email || !password || !birth_date || !id) 
      throw new AppError("Necessário enviar todos os campos obrigatórios.", 400);
    
    const userRepository = new UserRepository();
    const newId = id;
    const findOneUser = await userRepository.findOne(newId);
    
    if(await !argon2.verify(findOneUser.password, password))
      password = await argon2.hash(password);

    createdAt ? 
        createdAt = new Date(createdAt) :
        createdAt = new Date(); 
    
    birth_date = new Date(birth_date);
    
    const user = await userRepository.update({id, name, avatar, email, password, birth_date, createdAt});
    
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
