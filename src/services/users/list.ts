import UserRepository from "../../repository/users-repository";

export default class ListUserService {
  async execute() {
    const userRepository = new UserRepository();

    const users = await userRepository.list();

    const response = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        createdAt: user.createdAt,
        birth_date: user.birth_date,
        role: user.role
      };
    });

    return response;
  }
}
