import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserPrismaRepository } from 'src/user/repositories/user-prisma.repository';
import { BcryptService } from 'src/auth/encrypter/bcrypt.service';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService,
        { provide: 'IUserRepository', useClass: UserPrismaRepository },
        { provide: 'IEncrypter', useClass: BcryptService }
    ],
    exports: [UserService]
})
export class UserModule { }
