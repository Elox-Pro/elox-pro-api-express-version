
import prisma from "../helpers/prismaClient";
import { TUser } from "types/models";

export default class UserRepository {
    async create(user: TUser): Promise<TUser> {
        try {

            const createdUser = await prisma.user.create({
                data: {
                    role: user.role,
                    credential: {
                        create: {
                            username: user.credential?.username,
                            email: user.credential?.email,
                            password: user.credential?.password,
                            emailVerified: user.credential?.emailVerified,
                            authMethod: user.credential?.authMethod
                        }
                    }
                }, include: {
                    credential: true
                }
            });

            return createdUser as TUser;

        } catch (error) {
            console.log("Error creating user: ", error);
            throw error;
        }
    }

    async findMany(): Promise<TUser[]> {
        try {

            const users = await prisma.user.findMany({
                include: {
                    credential: true
                }
            });

            return (users) as TUser[];

        } catch (error) {
            console.error("Error getting users: ", error);
            throw error;
        }
    }
}