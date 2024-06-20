import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ValidatorModule } from './validator/validator.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
        ValidatorModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
