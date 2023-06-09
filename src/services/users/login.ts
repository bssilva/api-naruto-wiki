import UserRepository from "../../repository/users-repository";
import AppError from "../../shared/appError";
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken';

export default class CreateUserService {
  async execute(email: string, password: string) {
    if (!email || !password)
      throw new AppError(
        "Necessário enviar todos os campos obrigatórios.",
        400
      );

    const userRepository = new UserRepository();

    const dataUser = await userRepository.findOneByEmail(email)
    
    if (!await argon2.verify(dataUser.password, password)) 
        throw new AppError("Email ou senha inválido", 401)
    
    const token = jwt.sign({ email: dataUser.email, role: dataUser.role }, process.env.JWT_SECRET_KEY || "1234", { expiresIn: '24h' });
    return token

  }
}
