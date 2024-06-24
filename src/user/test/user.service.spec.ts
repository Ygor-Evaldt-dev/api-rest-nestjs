import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from '../user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaRepository } from '../repositories/prisma.repository';
import { BcryptService } from 'src/auth/encrypter/bcrypt.service';
import { getTestingModule } from './utils/get-testing-module';
import { users } from './utils/users';

describe('UserService', () => {
    let service: UserService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module = await getTestingModule();

        service = await module.resolve<UserService>(UserService);
        prismaService = await module.resolve<PrismaService>(PrismaService);

        const user = await service.findByEmail(users.exists.email);
        if (!user)
            await service.create(users.exists);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
    });

    it('should service be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should throw ConflictException if user is already registred', async () => {
            const exec = async () => service.create(users.exists);
            await expect(exec()).rejects.toThrow('Usuário já cadastrado');
        });

        it('should create a new user', async () => {
            const exec = async () => service.create(users.new);
            await expect(exec()).resolves.not.toThrow();
        });
    })

    describe('findByEmail', () => {
        it('should throw NotFoundException error if user is not registred', async () => {
            const exec = async () => service.findByEmail('any@gmail.com');
            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should return an user by email', async () => {
            const email = users.exists.email;
            const user = await service.findByEmail(email);

            expect(user).toBeDefined();
            expect(user.email?.complete).toBe(email);
        });
    });

    describe('findById', () => {
        it('should throw NotFoundException error if user is not exists', async () => {
            const exec = async () => service.findById(0);
            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should return an existing user', async () => {
            const existsUser = await service.findByEmail(users.exists.email);
            const user = await service.findById(existsUser.id);

            expect(user).toBeDefined();
            expect(user.id).toBe(existsUser.id);
        });
    });

    describe('update', () => {
        it('should throw NotFoundException error if user is not exists', async () => {
            const id = 0;
            const exec = async () => service.update(id, users.exists);

            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should update an existing user', async () => {
            const user = await service.findByEmail(users.exists.email);
            const exec = async () => service.update(user.id, users.exists);

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
            const user = await service.findByEmail(users.new.email);
            const exec = async () => service.remove(user.id);

            await expect(exec()).resolves.not.toThrow();
        });
    });
});
