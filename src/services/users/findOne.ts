import UserRepository  from "../../repository/user-repository"

export default class FindOneUserService{
  async execute(id: number) {
    const userRepository = new UserRepository()
    const user = await userRepository.findOne(id);
    return user;
  }
}
