import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getTestingModule } from './utils/get-testing-module';
import { users } from 'src/shared/test/users';
import { HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await getTestingModule();
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sing in', () => {
        it('should throw NotFoundExeption if user is not registred', async () => {
            const { password } = users.exists;
            const exec = async () => service.singIn('any@gmail.com', password);

            await expect(exec()).rejects.toThrow('Usuário não cadastrado')
        });

        it('should throw UnauthorizedException if user password is wrong', async () => {
            const { email } = users.exists;
            const exec = async () => service.singIn(email, 'any_pass');

            await expect(exec()).rejects.toThrow('Usuário não autorizado');
        });

        it('should return access token', async () => {
            const { email, password } = users.exists;
            const { accessToken } = await service.singIn(email, password);

            expect(accessToken).toBeDefined();
        });
    })
});
