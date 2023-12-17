import IUserRepository from "repositories/IUserRepository";
import prisma from "./prismaClient";
import { User } from "types/models";

export default class PrismaUserRepository implements IUserRepository {

    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany({
            include: {
                credential: true
            }
        });
        console.log(users);
        return (users) as User[];
    }
}