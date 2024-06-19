import {
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BcryptService } from './encrypter/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IEncrypter')
        private readonly encrypter: BcryptService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async singIn(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new NotFoundException('Usuário não cadastrado');

        const validPassword = await this.encrypter.compare(
            password,
            user.password,
        );
        if (!validPassword)
            throw new UnauthorizedException('Usuário não autorizado');

        delete user.password;
        const access_token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        });

        return { access_token };
    }
}
