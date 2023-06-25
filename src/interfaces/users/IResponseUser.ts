interface IResponseUser {
    id: number;
    name: string;
    avatar: string;
    email: string;
    password: string;
    createdAt: Date;
    birth_date: Date;
    role?: string;
}

export default IResponseUser;
