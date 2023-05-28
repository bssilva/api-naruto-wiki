import { PrismaClient } from "@prisma/client";
import IResponseClan from "../interfaces/clans/IResponseClan";

class ClansRepository {
  private prisma = new PrismaClient();

  async list() : Promise<IResponseClan[]> {
    const clans = await this.prisma.clans.findMany();
   
    return clans;
  }

}

export default ClansRepository;
