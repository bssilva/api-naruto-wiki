import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IResponseCharacter from "../interfaces/characters/IResponseCharacter";
import IRequestCharacter from "../interfaces/characters/IRequestCharacter";
import S3Storage from "../utils/S3Storage";
class CharactersRepository {
  private prisma = new PrismaClient();

  async list(): Promise<IResponseCharacter[]> {
    let characters = await this.prisma.characters.findMany();

    return characters;  
  };
  
  async findOne(id: number): Promise<IResponseCharacter> {
    const character = await this.prisma.characters.findUnique({
      where: { id },
    });

    if (!character) throw new AppError("Personagem não encontrado.", 404);

    return character;
  };

 async create({ name, about, info, page, images }: IRequestCharacter): Promise<IResponseCharacter> {
    try{
      const character = await this.prisma.characters.create({
        data: { name, about, info, page, images },
      });
      
      return character;

    }catch(err){
      const s3Storage = new S3Storage();

      for(const image of images){
        await s3Storage.rollbackImg(image, "images-characters");
      }

      throw new AppError("Nome de Personagem ja existente.", 409);
    }

  };
 
  async update({ id , name, about, info, page, images }: IRequestCharacter) : Promise<IResponseCharacter>{
    try{
      const character = await this.prisma.characters.update({
        where: { id },
        data: { name, about, info, page, images }
      });
      return character;

    }catch(err){
      const s3Storage = new S3Storage();
      
      for(const image of images){
        await s3Storage.rollbackImg(image, "images-characters");
      }

      throw new AppError("Nome de clan ja existente.", 409);
    }
  }; 
}

export default CharactersRepository;
