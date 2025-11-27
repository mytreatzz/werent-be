import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { prisma } from '../../prisma/lib/prisma';

@Injectable()
export class PrismaService {

  async onModuleInit() {
    await prisma.$connect();
  }
  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}