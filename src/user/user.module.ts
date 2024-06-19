import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserPrismaRepository } from 'src/database/user/user-prisma.repository';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService,
        { provide: 'IUserRepository', useClass: UserPrismaRepository },
    ],
})
export class UserModule {}
