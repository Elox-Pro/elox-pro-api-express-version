import { User } from "types/models";

export default interface IUserService {
    createUser(user: User): Promise<User>;
    getUsers(): Promise<User[]>;
}