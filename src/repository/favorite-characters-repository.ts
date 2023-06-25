import { PrismaClient } from "@prisma/client";
import AppError from "../shared/appError";
import IRequestFavoriteCharacters from "../interfaces/favoriteCharacters/IRequestFavoriteCharacters";
import IResponseFavoriteCharacters from "../interfaces/favoriteCharacters/IResponseFavoriteCharacters";

class FavoriteCharactersRepository {
  private prisma = new PrismaClient();

  async list(emailUser: string): Promise<IResponseFavoriteCharacters[]> {
    const favoriteCharacters = await this.prisma.favoriteCharacters.findMany({
      where: { emailUser }
    });

    return favoriteCharacters;
  };


  async findOne(id: number): Promise<IResponseFavoriteCharacters> {
    const favoriteCharacter = await this.prisma.favoriteCharacters.findUnique({
      where: { id },
    });

    if (!favoriteCharacter) throw new AppError("Personagem favorito não encontrado.", 404);

    return favoriteCharacter;
  };

  async create({idCharacter, emailUser} : IRequestFavoriteCharacters) : Promise<IResponseFavoriteCharacters> {
    try{
      const favoriteCharacter = await this.prisma.favoriteCharacters.create({
        data: { idCharacter, emailUser }
      });
      
      return favoriteCharacter;

    }catch(err){
      throw new AppError("Este personagem ja está nos seus favoritos", 409);
    }
  }

  async update({id, idCharacter, emailUser}: IRequestFavoriteCharacters) : Promise<IResponseFavoriteCharacters>{
    try{
      const favoriteCharacter = await this.prisma.favoriteCharacters.update({
        where: { id },
        data: { idCharacter, emailUser }
      });
      return favoriteCharacter;

    }catch(err){
      throw new AppError("Este personagem ja está nos seus favoritos", 409);
    }
  };
}

export default FavoriteCharactersRepository;