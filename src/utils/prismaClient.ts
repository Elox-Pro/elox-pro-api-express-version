import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: [
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' }
    ]
})

prisma.$on('warn', (e) => {
    console.log(e)
})

prisma.$on('error', (e) => {
    console.log(e)
})

export default prisma;