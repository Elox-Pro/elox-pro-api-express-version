import User from "domain/entities/models/User";
import IRepository from "./IRepository";
export default interface IUserRepository extends IRepository<User> { }