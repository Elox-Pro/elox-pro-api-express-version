import prisma from "../helpers/prismaClient";
import { TUserCredential } from "types/models";

export default class UserCredentialRepository {
    async findUniqueByUsername(username: string): Promise<TUserCredential | null> {
        try {

            const userCredential = await prisma.userCredential.findUnique({
                where: {
                    username: username
                },
                include: {
                    user: true
                }
            });

            return userCredential as TUserCredential;

        } catch (error) {
            console.error("Error finding user credential by username: ", error);
            throw error;
        }
    }

}