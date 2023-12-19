import IUserRepository from "repositories/IUserRepository";
import prisma from "../../helpers/prismaClient";
import { User } from "types/models";

export default class UserRepository implements IUserRepository {
    async createUser(user: User): Promise<User> {
        try {

            const createdUser = await prisma.user.create({
                data: {
                    role: user.role.toString(),
                    credential: {
                        create: {
                            username: user.credential?.username,
                            email: user.credential?.email,
                            password: user.credential?.password,
                            emailVerified: user.credential?.emailVerified,
                            authMethod: user.credential?.authMethod.toString(),
                        }
                    }
                }, include: {
                    credential: true
                }
            });

            return createdUser as User;

        } catch (error) {
            console.log("Error creating user: ", error);
            throw error;
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await prisma.user.findMany({
                include: {
                    credential: true
                }
            });

            return (users) as User[];
        } catch (error) {
            console.error("Error getting users: ", error);
            throw error;
        }
    }
}