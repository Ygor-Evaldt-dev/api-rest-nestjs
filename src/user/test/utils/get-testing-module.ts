import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from '../../user.controller';
import { UserService } from '../../user.service';
import { PrismaRepository } from '../../repositories/prisma.repository';
import { BcryptService } from 'src/auth/encrypter/bcrypt.service';
import { PrismaService } from 'src/database/prisma.service';

export async function getTestingModule(): Promise<TestingModule> {
    return await Test.createTestingModule({
        imports: [DatabaseModule],
        controllers: [UserController],
        providers: [
            UserService,
            PrismaService,
            { provide: 'IUserRepository', useClass: PrismaRepository },
            { provide: 'IEncrypter', useClass: BcryptService },
        ]
    }).compile();
}
