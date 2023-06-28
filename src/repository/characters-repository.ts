import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IResponseCharacter from "../interfaces/characters/IResponseCharacter";
import IRequestCharacter from "../interfaces/characters/IRequestCharacter";
import S3Storage from "../utils/S3Storage";

interface IQueryParamsCharacter {
  filterOptions?: {
    sexo?: string;
    estado?: string;
    classificacao?: string;
    nome?: string;
    clan?: string;
  };
}
class CharactersRepository {
  private prisma = new PrismaClient();

  async list(
    { filterOptions }: IQueryParamsCharacter,
    page: number,
    limit: number
  ): Promise<IResponseCharacter[]> {
    let characters;

    if (!filterOptions) {
      characters = await this.prisma.characters.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
    } else {
      characters = await this.prisma.characters.findMany({
        where: {
          AND: [
            filterOptions.sexo
              ? {
                  info: {
                    path: ["Sexo"],
                    equals: filterOptions.sexo,
                  },
                }
              : {},
            filterOptions.estado
              ? {
                  info: {
                    path: ["Estado"],
                    equals: filterOptions.estado,
                  },
                }
              : {},
            filterOptions.classificacao
              ? {
                  info: {
                    path: ["Classificação"],
                    equals: filterOptions.classificacao,
                  },
                }
              : {},
            filterOptions.nome
              ? {
                  name: filterOptions.nome,
                }
              : {},
            filterOptions.clan
              ? {
                  info: {
                    path: ["Clã"],
                    equals: filterOptions.clan,
                  },
                }
              : {},
          ],
        },
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    return characters;
  }

  async findOne(id: number): Promise<IResponseCharacter> {
    const character = await this.prisma.characters.findUnique({
      where: { id },
    });

    if (!character) throw new AppError("Personagem não encontrado.", 404);

    return character;
  }

  async create({
    name,
    about,
    info,
    page,
    images,
  }: IRequestCharacter): Promise<IResponseCharacter> {
    try {
      const character = await this.prisma.characters.create({
        data: { name, about, info, page, images },
      });

      return character;
    } catch (err) {
      const s3Storage = new S3Storage();

      for (const image of images) {
        await s3Storage.rollbackImg(image, "images-characters");
      }

      throw new AppError("Nome de Personagem ja existente.", 409);
    }
  }

  async update({
    id,
    name,
    about,
    info,
    page,
    images,
  }: IRequestCharacter): Promise<IResponseCharacter> {
    try {
      const character = await this.prisma.characters.update({
        where: { id },
        data: { name, about, info, page, images },
      });
      return character;
    } catch (err) {
      const s3Storage = new S3Storage();

      for (const image of images) {
        await s3Storage.rollbackImg(image, "images-characters");
      }

      throw new AppError("Nome de clan ja existente.", 409);
    }
  }

  async delete(id: number): Promise<IResponseCharacter> {
    const character = await this.prisma.characters.delete({
      where: { id },
    });
    return character;
  }
}

export default CharactersRepository;
