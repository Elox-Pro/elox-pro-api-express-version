import IUserRepository from "../../repositories/IUserRepository";
import prisma from "../../helpers/prismaClient";
import { TUser } from "types/prismaTypes";

export class UserRepository implements IUserRepository<TUser> {
    async create(user: TUser): Promise<TUser> {
        try {

            const credential = user.credential;

            if (!credential) {
                throw new Error("Credential is required");
            }

            const createdUser = await prisma.user.create({
                data: {
                    role: user.role,
                    credential: {
                        create: {
                            username: credential.username,
                            email: credential.email,
                            password: credential.password,
                            authMethod: credential.authMethod
                        }
                    }
                },
                include: {
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