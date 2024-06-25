import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { getTestingModule } from './utils/get-testing-module';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module = await getTestingModule();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
