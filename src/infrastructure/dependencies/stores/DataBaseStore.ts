import DIContainer from "../DICointainer";
import { PrismaClient } from "@prisma/client";

const container: DIContainer = new DIContainer();

export default class DataBaseStore {

    static getPrismaClient(): PrismaClient {

        return container.resolve(PrismaClient.name, () => {

            const prisma = new PrismaClient({
                log: [
                    { level: 'warn', emit: 'event' },
                    { level: 'error', emit: 'event' }
                ]
            });

            prisma.$on('warn', (e) => {
                console.warn(e)
            });

            prisma.$on('error', (e) => {
                console.error(e)
            });

            return prisma;

        });
    }
}