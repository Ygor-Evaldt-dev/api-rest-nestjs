import { Module } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { EmailValidator } from './email-validator/email-validator.service';

@Module({
    providers: [
        { provide: 'IEmailValidator', useClass: EmailValidator },
        ValidatorService
    ],
    exports: ['IEmailValidator']
})
export class ValidatorModule { }
