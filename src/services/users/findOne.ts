import UserRepository from "../../repository/users-repository";
import AppError from "../../shared/appError";

export default class FindOneUserService {
  async execute(id: string) {
    if(!parseInt(id)) throw new AppError("Dados inválidos! O ID do usuário deve ser um valor numérico inteiro.", 406) 

    const newId = parseInt(id)
    const userRepository = new UserRepository();

    const user = await userRepository.findOne(newId);
    
    const response = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      createdAt: user.createdAt,
      birth_date: user.birth_date
    };

    return response;
  }
}
