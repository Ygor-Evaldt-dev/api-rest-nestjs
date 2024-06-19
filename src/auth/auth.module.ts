import { Module } from '@nestjs/common';
import { BcryptService } from './encrypter/bcrypt.service';

@Module({
    providers: [BcryptService],
    exports: [BcryptService]
})
export class AuthModule { }
