import UserRepository  from "../../repository/users-repository"
import IRequestUser from "../../interfaces/users/IRequestUser";
import AppError from "../../shared/appError";
import S3Storage from "../../utils/S3Storage";
import * as argon2 from "argon2";;
import { extractRoleFromToken } from "../../utils/jwtUtils";

export default class CreateUserService{
    async execute({name, avatar, email, password, birth_date, createdAt, role, authorization}: IRequestUser) {
        if(!name || !avatar || !email || !password || !birth_date) 
            throw new AppError("Necessário enviar todos os campos obrigatórios.", 400);
        
        createdAt ? 
            createdAt = new Date(createdAt) :
            createdAt = new Date();
        
        birth_date = new Date(birth_date);
        
        if(role && role === "Administrator"){
            const getRole = authorization && extractRoleFromToken(authorization)
            if(getRole !== 'Administrator') throw new AppError("Sem permissao para criar usuarios 'Admin'", 401);
        }
        
        const hash = await argon2.hash(password);

        const s3Storage = new S3Storage();
        const userRepository = new UserRepository();

        const urlImg = await s3Storage.saveFile(avatar, "avatar-user-api");

        const user = await userRepository.create({name, avatar: urlImg, email, password: hash, birth_date, createdAt, role});

        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
            birth_date: user.birth_date,
            role: user.role
        }; 

        return response;
    }
}
