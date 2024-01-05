import User from "domain/entities/user/User";
export default interface IUserRepository {

    createOne(user: User): Promise<User>;
    findUniqueByUsername(username: string): Promise<User | null>;

}