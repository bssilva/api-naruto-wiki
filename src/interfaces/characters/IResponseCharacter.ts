
import { Prisma } from '@prisma/client';
interface IResponseCharacter {
  id: number;
  about: string[];
  info: Prisma.JsonValue | null;
  page: string;
  name: string;
  images: string[];
}


export default IResponseCharacter;
