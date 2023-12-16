import { PrismaClient } from "@prisma/client";
import type { User } from "../../src/types/models";

export default class UserSeed implements ISeed {

    constructor(private prisma: PrismaClient, private users: Array<User>) {

    }

    seed(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}