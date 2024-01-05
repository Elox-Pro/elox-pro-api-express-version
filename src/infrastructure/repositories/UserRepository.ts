import { PrismaClient } from "@prisma/client";
import User from "domain/entities/user/User";
import IUserRepository from "domain/interfaces/repositories/IUserRepository";

export default class UserRepository implements IUserRepository {

    constructor(private readonly prisma: PrismaClient) { }

    async createOne(user: User): Promise<User> {
        try {
            const userCreated = await this.prisma.user.create({
                data: {
                    ...user
                }
            });
            return userCreated;
        } catch (error) {
            throw error;
        }
    }
    async findUniqueByUsername(username: string): Promise<User | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    username
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
}