import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/auth/encrypter/bcrypt.service';
import { UserModule } from 'src/user/user.module';

export async function getTestingModule() {
	const module: TestingModule = await Test.createTestingModule({
		imports: [
			ConfigModule.forRoot({
				isGlobal: true,
			}),
			JwtModule.registerAsync({
				global: true,
				useFactory: async (configService: ConfigService) => ({
					secret: configService.get<string>('TOKEN_SECRET'),
					signOptions: {
						expiresIn: configService.get<string>('TOKEN_TIME'),
					},
				}),
				inject: [ConfigService],
			}),
			UserModule,
		],
		providers: [
			{
				provide: APP_GUARD,
				useClass: AuthGuard,
			},
			{
				provide: 'IEncrypter',
				useClass: BcryptService,
			},
			BcryptService,
			AuthService,
		],
		exports: [BcryptService, AuthService],
		controllers: [AuthController],
	}).compile();

	return module;
}
