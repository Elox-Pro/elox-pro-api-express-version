import { PrismaClient } from "@prisma/client";

export default class UserRepository {
    constructor(private prisma: PrismaClient) { }
}