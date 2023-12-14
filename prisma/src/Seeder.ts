import { PrismaClient } from "@prisma/client"

export default class Seeder {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async seed() {}
}
