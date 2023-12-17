import { User } from "types/models";

export default interface IUserService {
    getUsers(): Promise<User[]>;
}