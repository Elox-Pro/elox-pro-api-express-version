import IUserRepository from "../../repositories/IUserRepository";
import prisma from "../../helpers/prismaClient";
import { TUser } from "types/prismaTypes";

export class UserRepository implements IUserRepository<TUser> {
    async findUniqueByUsername(username: string): Promise<TUser | null> {
        try {

            return await prisma.user.findUnique({
                where: {
                    username
                }
            });

        } catch (error) {
            console.error("Error finding unique user by username: ", error);
            throw error;
        }
    }
    async create(user: TUser): Promise<TUser> {
        try {

            return await prisma.user.create({
                data: {
                    role: user.role,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    authMethod: user.authMethod
                }
            });

        } catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    }

    async findMany(): Promise<TUser[]> {
        try {

            return await prisma.user.findMany();

        } catch (error) {
            console.error("Error getting users: ", error);
            throw error;
        }
    }
}