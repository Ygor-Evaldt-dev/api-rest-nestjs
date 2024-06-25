import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { getTestingModule } from './utils/get-testing-module';
import { getAxiosInstance } from 'src/shared/test/get-axios-instance';
import { AxiosInstance } from 'axios';
import { users } from 'src/shared/test/users';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
    let controller: AuthController;
    let axiosInstance: AxiosInstance;

    beforeAll(async () => {
        axiosInstance = getAxiosInstance();
        const module = await getTestingModule();
        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('sing in', () => {
        it('shoult throw BadRequestError if email is not provided', async () => {
            try {
                await axiosInstance.post('/auth/login', {
                    ...users.exists,
                    email: null
                });
            } catch (error: any) {
                const { message, statusCode } = error.response?.data;

                expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
                expect(message[0]).toBe('Informe o e-mail cadastrado');

            }
        });

        it('shoult throw BadRequestError if password is not provided', async () => {
            try {
                await axiosInstance.post('/auth/login', {
                    ...users.exists,
                    password: null
                });
            } catch (error: any) {
                const { message, statusCode } = error.response?.data;

                expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
                expect(message[0]).toBe('Informe a senha');

            }
        });

        it('shoult throw UnauthorizedException if password is provided but it is wrong', async () => {
            try {
                await axiosInstance.post('/auth/login', {
                    ...users.exists,
                    password: 'wrong'
                });
            } catch (error: any) {
                const { message, statusCode } = error.response?.data;

                expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
                expect(message).toBe('Usuário não autorizado');

            }
        });

        it('shoult throw NotFoundExeption if email is provided but it is not registred', async () => {
            try {
                await axiosInstance.post('/auth/login', {
                    ...users.exists,
                    email: 'any_email@gmail.com'
                });
            } catch (error: any) {
                const { message, statusCode } = error.response?.data;

                expect(statusCode).toBe(HttpStatus.NOT_FOUND);
                expect(message).toBe('Usuário não cadastrado');

            }
        });

        it('should success login', async () => {
            const response = await axiosInstance.post('/auth/login', { ...users.exists });
            expect(response.status).toBe(200);
            expect(response.data.accessToken).toBeDefined();
        })
    });


});
