import UserRepository  from "../../repository/user-repository"
import IRequestUser from "../../interfaces/users/IRequestUser";
import AppError from "../../shared/appError";
import * as argon2 from "argon2";;

export default class CreateUserService{
    async execute({name, avatar, email, password, birth_date, createdAt}: IRequestUser) {
        if(!name || !avatar || !email || !password || !birth_date) 
            throw new AppError("Necessário enviar todos os campos obrigatórios.", 400)
        
        createdAt ? 
            createdAt = new Date(createdAt) :
            createdAt = new Date() 
        
        birth_date = new Date(birth_date)

        const hash = await argon2.hash(password);

        const userRepository = new UserRepository()

        const user = await userRepository.create({name, avatar, email, password: hash, birth_date, createdAt});

        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
            birth_date: user.birth_date
        }; 

        return response;
    }
}
