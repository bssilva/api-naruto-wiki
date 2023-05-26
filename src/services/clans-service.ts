import Clans from "../models/clans";
import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import Argon2 from "argon2";
import IRequestGet from "../interfaces/clans/IRequestGet";
import IRequestPost from "../interfaces/clans/IRequestPost";
import IRequestPut from "../interfaces/clans/IRequestPut";

const prisma = new PrismaClient();

class ClansService {
  public async getAll(): Promise<Clans[]> {
    const clans = await prisma.clans.findMany();
    return clans;
  }

  public async getById({ id }: IRequestGet): Promise<Clans> {
    const clan = await prisma.clans.findUnique({
      where: { id },
    });

    if (!clan) throw new AppError("Clan não encontrado", 404);

    return clan;
  }

  public async post({ name, link, icon }: IRequestPost): Promise<Clans> {
    if (!name || !link || !icon)
      throw new AppError("Obrigatório preencher todos os campos", 400);

    const clan = await prisma.clans.create({
      data: {
        name,
        link,
        icon,
      },
    });

    return clan;
  }

  public async put({ id, name, link, icon }: IRequestPut): Promise<Clans> {
    await this.getById({ id });

    const clan = await prisma.clans.update({
      where: { id },
      data: {
        name,
        link,
        icon,
      },
    });

    return clan;
  }
}

export default ClansService;
