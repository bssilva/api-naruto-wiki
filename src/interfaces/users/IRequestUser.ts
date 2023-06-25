interface IRequestUser {
    id?: number;
    name: string;
    avatar?: string;
    email: string;
    password: string;
    birth_date: Date;
    createdAt: Date;
    role?: string;
    authorization?: string
}
export default IRequestUser;
