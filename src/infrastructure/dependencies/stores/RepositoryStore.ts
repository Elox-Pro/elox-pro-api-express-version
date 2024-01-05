import DIContainer from "../DICointainer";
import { PrismaClient } from "@prisma/client";
import UserRepository from "infrastructure/repositories/UserRepository";
import DataBaseStore from "./DataBaseStore";

const containter: DIContainer = new DIContainer();
const prisma: PrismaClient = DataBaseStore.getPrismaClient();

export default class RepositoyStore {

    static getUserRepository(): UserRepository {
        return containter.resolve(UserRepository.name, () => new UserRepository(prisma));
    }
}