import { PrismaClient } from "@prisma/client";
import UserRepository from "repositories/UserRepository";

export default class UserService {
    private readonly userRepository: UserRepository;

    constructor(prisma: PrismaClient) {
        this.userRepository = new UserRepository(prisma);
    }

    getUsers = () => {
        return null;
    }
}