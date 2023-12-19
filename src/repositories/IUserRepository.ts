import { User } from "types/models";
export default interface IUserRepository {
    createUser(user: User): Promise<User>;
    getUsers(): Promise<User[]>;
}