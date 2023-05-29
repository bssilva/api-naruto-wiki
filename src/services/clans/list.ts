import ClansRepository from "../../repository/clans-repository";

export default class ListClanService {
  async execute() {
    const clansRepository = new ClansRepository();

    const clans = await clansRepository.list();

    return clans;
  }
}
