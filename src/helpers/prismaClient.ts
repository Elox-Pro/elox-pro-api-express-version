import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: [
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' }
    ]
})

prisma.$on('warn', (e) => {
    console.warn(e)
})

prisma.$on('error', (e) => {
    console.error(e)
})

export default prisma;