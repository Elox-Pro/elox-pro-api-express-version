import IUserCredentialRepository from "../../repositories/IUserCredentialRepository";
import prisma from "../../helpers/prismaClient";
import { TUserCredential } from "types/prismaTypes";

export class UserCredentialRepository implements IUserCredentialRepository<TUserCredential> {
    async findUniqueByUsername(username: string): Promise<TUserCredential | null> {
        try {

            const userCredential = await prisma.userCredential.findUnique({
                where: {
                    username: username
                }
            });

            return userCredential;

        } catch (error) {
            console.error("Error finding user credential by username: ", error);
            throw error;
        }
    }
}