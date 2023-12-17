import IUserService from "../../services/IUserService";
import IUserRepository from "../../repositories/IUserRepository";
import PrismaUserRepository from "../../repositories/prisma/PrismaUserRepository";
import { User } from "types/models";

export default class UserService implements IUserService {
    private readonly userRepository: IUserRepository;

    constructor() {
        this.userRepository = new PrismaUserRepository();
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }
}