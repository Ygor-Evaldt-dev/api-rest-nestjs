import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in.dto';
import { SkipAuth } from './custon-decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @SkipAuth()
    @Post('login')
    async singIn(@Body() { email, password }: SingInDto) {
        return await this.authService.singIn(email, password);
    }
}
