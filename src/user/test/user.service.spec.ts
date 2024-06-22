import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from '../user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaRepository } from '../repositories/prisma.repository';
import { BcryptService } from 'src/auth/encrypter/bcrypt.service';

describe('UserService', () => {
    let service: UserService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule],
            controllers: [UserController],
            providers: [
                UserService,
                { provide: 'IUserRepository', useClass: PrismaRepository },
                { provide: 'IEncrypter', useClass: BcryptService },
            ],
            exports: [UserService]
        }).compile();

        service = await module.resolve<UserService>(UserService);
        prismaService = await module.resolve<PrismaService>(PrismaService);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
    });

    it('should service be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should throw ConflictException if user is already registred', async () => {
            const exec = async () => service.create({
                email: 'new_user@gmail.com',
                password: 'p@ssw0rD3'
            });
            await expect(exec()).rejects.toThrow('Usuário já cadastrado');
        });
        it.skip('should create a new user', async () => {
            const exec = async () => service.create({
                email: 'new_user@gmail.com',
                password: 'p@ssw0rD3'
            })
            await expect(exec()).resolves.not.toThrow();
        });
    })

    describe('findByEmail', () => {
        it('should throw NotFoundException error if user is not registred', async () => {
            const exec = async () => service.findByEmail('any@gmail.com');
            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should return an user by email', async () => {
            const email = 'admin@gmail.com';
            const user = await service.findByEmail(email);
            expect(user).toBeDefined();
            expect(user.email?.complete).toBe(email);
        });
    });

    describe('findById', () => {
        it('should throw NotFoundException error if user is not exists', async () => {
            const id = 0;
            const exec = async () => service.findById(id);
            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should return an existing user', async () => {
            const id = 1;
            const user = await service.findById(id);
            expect(user).toBeDefined();
            expect(user.id).toBe(id);
        });
    });

    describe('update', () => {
        it('should throw NotFoundException error if user is not exists', async () => {
            const id = 0;
            const exec = async () => service.update(id, {
                name: "any_name"
            });
            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should update an existing user', async () => {
            const id = 11;
            const exec = async () => service.update(id, {
                name: "any_name"
            });
            await expect(exec()).resolves.not.toThrow();
        });
    });

    describe('remove', () => {
        it('should throw NotFoundException error if user is not exists', async () => {
            const id = 0;
            const exec = async () => service.remove(id);
            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should remove an existing user', async () => {
            const id = 11;
            const exec = async () => service.remove(id);
            await expect(exec()).resolves.not.toThrow();
        });
    });
});
