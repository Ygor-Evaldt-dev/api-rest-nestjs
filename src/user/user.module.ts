import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaRepository } from 'src/user/repositories/prisma.repository';
import { BcryptService } from 'src/auth/encrypter/bcrypt.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService,
        { provide: 'IUserRepository', useClass: PrismaRepository },
        { provide: 'IEncrypter', useClass: BcryptService },
    ],
    exports: [UserService],
})
export class UserModule { }
