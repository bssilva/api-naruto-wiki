import UserRepository from "../../repository/users-repository";
import AppError from "../../shared/appError";

export default class DeleteUserService {
  async execute(id: number) {
    if (!id)
      throw new AppError(
        "Dados inválidos! O ID deve ser um valor numérico inteiro.",
        406
      );

    const userRepository = new UserRepository();
    await userRepository.findOneById(id);
    
    const user = await userRepository.delete(id);

    const response = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      createdAt: user.createdAt,
      birth_date: user.birth_date,
      role: user.role
    };

    return response;
  }
}
