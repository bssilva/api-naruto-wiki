import IResponseGet from "../../interfaces/users/IResponseGet";

export interface IUserService {
  // list(): Promise<IResponseGet[]>;
  // create(user: Prisma.usersCreateInput): Promise<users>;
  findOne(id: number): Promise<IResponseGet | null>;
}
