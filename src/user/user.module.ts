import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserPrismaRepository } from 'src/database/user/user-prisma.repository';
import { BcryptAdapter } from 'src/external/adapters/bcrypt.adapter';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService,
        { provide: 'IUserRepository', useClass: UserPrismaRepository },
        { provide: 'IEncrypter', useClass: BcryptAdapter }
    ],
})
export class UserModule { }
