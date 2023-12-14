import { PrismaClient } from "@prisma/client"
import Seeder from "./src/Seeder"

(async function main() {
    const prisma = new PrismaClient()
    try {

        const seeder = new Seeder(prisma)
        await seeder.seed()

    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
})()
