import ClansRepository from "../../repository/clans-repository";

export default class ListClanService {
  async execute(page: number, limit: number) {
    const clansRepository = new ClansRepository();

    const clans = await clansRepository.list(page, limit);

    return clans;
  }
}
