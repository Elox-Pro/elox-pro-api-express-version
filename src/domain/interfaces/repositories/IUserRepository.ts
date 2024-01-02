import User from "domain/entities/user/User";
import IRepository from "./IRepository";
export default interface IUserRepository extends IRepository<User> {

    findUniqueByUsername(username: string): Promise<User>;

}