import { User } from "types/models";
export default interface IUserRepository {
    getUsers(): Promise<User[]>;
}