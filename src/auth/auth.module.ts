import { Module } from '@nestjs/common';
import { BcryptService } from './encrypter/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('TOKEN_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('TOKEN_TIME')
                },
            }),
            inject: [ConfigService]
        }),
        UserModule
    ],
    providers: [
        {
            provide: 'IEncrypter',
            useClass: BcryptService
        },
        BcryptService,
        AuthService
    ],
    exports: [BcryptService, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
