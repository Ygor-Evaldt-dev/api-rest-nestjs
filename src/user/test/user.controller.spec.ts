import { TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { getTestingModule } from './utils/get-testing-module';
import { users } from './utils/users';
import { AxiosInstance } from 'axios';
import { getAxiosInstance } from 'src/auth/test/utils/get-axios-instance';
import { getAuthorization } from 'src/auth/test/utils/get-authorization';
import {
	NAME_MAX_LENGTH,
	NAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	PHONE_LENGTH
} from 'src/shared/constants/validator.constants';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from '../user.service';
import { HttpStatus } from '@nestjs/common';

describe('UserController', () => {
	let controller: UserController;
	let service: UserService;
	let prismaService: PrismaService;
	let axiosInstance: AxiosInstance;

	beforeAll(async () => {
		const module: TestingModule = await getTestingModule();
		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
		prismaService = module.get<PrismaService>(PrismaService);

		axiosInstance = getAxiosInstance();
	});

	afterAll(async () => {
		await prismaService.$disconnect();
	});

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
				const { statusCode, message } = error?.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe('E-mail inválido');
			}
		});

		it('should throw error if email is too long', async () => {
			try {
				await axiosInstance.post('/user', users.bigEmail);
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;

				expect(statusCode).toBe(400);
				expect(message[0]).toBe(
					'E-mail deve ter no máximo 150 caracteres'
				);
			}
		});

		it('should throw error if email is a number', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					email: 1
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe('E-mail inválido');
			}
		});

		it('should throw error if email is not provided', async () => {
			try {
				await axiosInstance.post('/user', {
					password: 'AnyP@sw0rd'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe('E-mail é obrigatório');
			}
		});

		it('should throw error if password is not provided', async () => {
			try {
				await axiosInstance.post('/user', {
					email: 'any_email@gmail.com'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe('Senha é obrigatória');
			}
		});

		it('should throw error if password is not strong', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					password: '123456'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe(
					'Senha deve conter no mínimo uma letra maiúscula, um número e um caracter especial'
				);
			}
		});

		it('should throw error if password is short', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					password: 'A1@45'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe(
					`Senha deve ter entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres`
				);
			}
		});

		it('should throw error if password is too long', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					password:
						'A1@45A1@45A1@45A1@45A1@45A1@45A1@45A1@45A1@45A1@45A1@45A1@45A1@45'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe(
					`Senha deve ter entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres`
				);
			}
		});

		it('should throw error if name is provided but it is short', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					name: 'ab'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe(
					`Nome deve ter no mínimo ${NAME_MIN_LENGTH} e no máximo ${NAME_MAX_LENGTH} caracteres`
				);
			}
		});

		it('should throw error if name is provided but it is too long', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					name: 'anynameanynameanynameanynameanynameanynameanynameanynameanynameanynameanynameanynameanynameanynameanyname'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe(
					`Nome deve ter no mínimo ${NAME_MIN_LENGTH} e no máximo ${NAME_MAX_LENGTH} caracteres`
				);
			}
		});

		it('should throw error if phone number is provided but it is invalid', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					phone: '518888-7777'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe(`Telefone inválido`);
			}
		});

		it('should throw error if phone number is provided and is valid but also very long', async () => {
			try {
				await axiosInstance.post('/user', {
					...users.new,
					phone: '519888877771'
				});
			} catch (error: any) {
				const { statusCode, message } = error.response?.data;
				expect(statusCode).toBe(400);
				expect(message[0]).toBe(
					`Telefone deve ter ${PHONE_LENGTH} dígitos`
				);
			}
		});

		it('should create new user', async () => {
			const { status } = await axiosInstance.post('/user', users.new);
			expect(status).toBe(HttpStatus.CREATED);
		});
	});

	describe('update', () => {
		it('should throw notFoundExeption if user is not registred', async () => {
			try {
				const { accessToken } = await getAuthorization();
				const { status } = await axiosInstance.patch(
					`/user/0`,
					{},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`
						}
					}
				);

				expect(status).toBe(200);
			} catch (error: any) {
				const { statusCode, message } = error?.response?.data;
				expect(statusCode).toBe(HttpStatus.NOT_FOUND);
				expect(message).toBe('Usuário não cadastrado');
			}
		});

		it('should update an existing user', async () => {
			const [user, { accessToken }] = await Promise.all([
				service.findByEmail(users.exists.email),
				getAuthorization()
			]);

			const { status } = await axiosInstance.patch(
				`/user/${user.id}`,
				{
					name: 'desenvolvedor',
					phone: '51988776655'
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				}
			);

			expect(status).toBe(200);
		});
	});

	describe('delete', () => {
		it('should throw notFoundExeption if user is not registred', async () => {
			try {
				const { accessToken } = await getAuthorization();
				const { status } = await axiosInstance.delete(`/user/0`, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					},
					data: {}
				});

				expect(status).toBe(200);
			} catch (error: any) {
				const { statusCode, message } = error?.response?.data;
				expect(statusCode).toBe(HttpStatus.NOT_FOUND);
				expect(message).toBe('Usuário não cadastrado');
			}
		});

		it('should delete an existing user', async () => {
			const [user, { accessToken }] = await Promise.all([
				service.findByEmail(users.new.email),
				getAuthorization()
			]);

			const { status } = await axiosInstance.delete(`/user/${user.id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			expect(status).toBe(200);
		});
	});
});
