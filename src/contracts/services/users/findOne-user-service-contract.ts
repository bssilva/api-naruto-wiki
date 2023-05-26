import IResponseGet from "../../../interfaces/users/IResponseGet";

export interface IFindOneUserService {
  execute(id: number): Promise<IResponseGet | null>;
}
