import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in.dto';
import { SkipAuth } from './custon-decorators/skip-auth.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Autenticar' })
    @SkipAuth()
    @Post('login')
    @HttpCode(200)
    async singIn(@Body() { email, password }: SingInDto) {
        return await this.authService.singIn(email, password);
    }
}
