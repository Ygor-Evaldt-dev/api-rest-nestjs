import {
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IEncrypter } from './encrypter/encrypter.interface';

@Injectable()
export class AuthService {
	constructor(
		@Inject('IEncrypter')
		private readonly encrypter: IEncrypter,
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

		const accessToken = await this.jwtService.signAsync({
			sub: user.id,
			email: user.email.complete,
		});

		return { accessToken };
	}
}
