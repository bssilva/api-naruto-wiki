import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IResponseCharacter from "../interfaces/characters/IResponseCharacter";
import IRequestCharacter from "../interfaces/characters/IRequestCharacter";

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

 async create({ name, link, icon }: IRequestCharacter): Promise<IResponseClan> {
    try{
      if(!icon) throw new AppError("Icone do clan obrigatório", 400);

      const clan = await this.prisma.clans.create({
        data: { name, link, icon },
      });
      
      return clan;

    }catch(err){
      throw new AppError("Nome de Clan ja existente.", 409);
    }

  };
 
  /*async update({ id, name, link, icon }: IRequestClan) : Promise<IResponseClan>{
    try{
      const clan = await this.prisma.clans.update({
        where: { id },
        data: { name, link, icon }
      });
      return clan;

    }catch(err){
      throw new AppError("Nome de clan ja existente.", 409);
    }
  }; */
}

export default CharactersRepository;
