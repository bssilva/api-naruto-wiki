import { IUserService } from "../contracts/services/user-service-contract";
import { IUserRepository } from "../contracts/repository/user-repository-contract";

export default class UserService implements IUserService {

  constructor(private userRepository: IUserRepository) {}

  // async create({ user }: any){
  //   user.createdAt = new Date();
  //   user.birth_date = new Date(user.birth_date);

  //   const { name, avatar, email, password, createdAt, birth_date } = user;
    
  //   if (!name || !avatar || !email || !password || !birth_date || !createdAt)
  //     throw new AppError("Obrigatório preencher todos os campos", 400);

  //   const hashPassword = await Argon2.hash(password);

  //   const createUser = await this.userRepository.create({name, avatar, email, password, cr})
  // }

  // async list() {
  //   const users = await this.userRepository.list();
  //   return users;
  // }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    return user;
  }
}
