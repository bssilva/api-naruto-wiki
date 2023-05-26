import IResponseGet from "../../../interfaces/users/IResponseGet";

export interface IFindOneUserRepository {
  // list(): Promise<IResponseGet[]>;
  // create(user: Prisma.usersCreateInput): Promise<users>;
  execute(id: number): Promise<IResponseGet | null>;
}
