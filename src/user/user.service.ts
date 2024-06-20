import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from 'src/user/repositories/user.repository.interface';
import { IEncrypter } from 'src/auth/encrypter/encrypter.interface';
import { ValidatorService } from 'src/validator/validator.service';
import { cleanDto } from 'src/shared/utils/clean-dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('IEncrypter')
        private readonly encrypter: IEncrypter,
        private readonly validatorService: ValidatorService
    ) { }

    async create(createUserDto: CreateUserDto) {
        const validatedDto = this.validatorService.dto(createUserDto);
        const { email, password } = validatedDto;

        if (!email)
            throw new BadRequestException("Email é obrigatório");
        else if (!password)
            throw new BadRequestException("Senha é obrigatória");

        const userWithSameEmail = await this.userRepository.findUnique({ email });
        if (userWithSameEmail) throw new ConflictException("Usuário já cadastrado");

        validatedDto.password = await this.encrypter.hash(password);
        await this.userRepository.create(validatedDto);
    }

    async findById(id: number) {
        const user = await this.checkIfUserExists(id);
        return user;
    }

    async findByEmail(email: string) {
        return await this.userRepository.findUnique({ email });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.checkIfUserExists(id);

        const validatedDto = this.validatorService.dto(updateUserDto);

        const { password } = validatedDto;
        if (password)
            validatedDto.password = await this.encrypter.hash(password);

        await this.userRepository.update(id, validatedDto);
    }

    async remove(id: number) {
        await this.checkIfUserExists(id);
        await this.userRepository.delete(id);
    }

    private async checkIfUserExists(id: number) {
        const user = await this.userRepository.findUnique({ id });
        if (!user) throw new NotFoundException('Usuário não cadastrado');

        return user;
    }
}
