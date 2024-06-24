import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { getTestingModule } from './utils/get-testing-module';
import { PrismaService } from 'src/database/prisma.service';
import { users } from './utils/users';
import { AxiosInstance } from 'axios';
import { getAxiosInstance } from './utils/get-axios-instance';

describe('UserController', () => {
    let controller: UserController;
    let axiosInstance: AxiosInstance;
    // let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await getTestingModule();

        controller = module.get<UserController>(UserController);
        axiosInstance = getAxiosInstance();
        // prismaService = await module.resolve<PrismaService>(PrismaService);
    });

    // afterAll(async () => {
    //     await prismaService.$disconnect();
    // });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should throw error if invalid email is provided', async () => {
            try {
                await axiosInstance.post('/user', {
                    ...users.new,
                    email: 'invalid'
                });
            } catch (error: any) {
                const [message] = error.response.data.message;
                expect(message).toBeDefined();
                expect(message).toBe('E-mail inválido');
            }
        });

        it('should throw error if email is too long', async () => {
            try {
                await axiosInstance.post('/user', users.bigEmail);
            } catch (error: any) {
                const [message] = error.response.data.message;
                expect(message).toBeDefined();
                expect(message).toBe('E-mail deve ter no máximo 150 caracteres');
            }
        });

        it('should throw error if email is not a text', async () => {
            try {
                await axiosInstance.post('/user', {
                    ...users.new,
                    email: 1
                });
            } catch (error: any) {
                const [message] = error.response.data.message;
                expect(message).toBeDefined();
                expect(message).toBe('E-mail inválido');
            }
        });
    });

});
