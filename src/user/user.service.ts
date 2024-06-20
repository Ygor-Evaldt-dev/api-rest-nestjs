import {
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
        this.validateDtos(createUserDto);

        const { email, password } = createUserDto;

        const userWithSameEmail = await this.userRepository.findUnique({ email });
        if (userWithSameEmail) throw new ConflictException("Usuário já cadastrado");

        createUserDto.password = await this.encrypter.hash(password);
        await this.userRepository.create(createUserDto);
    }

    async findById(id: number) {
        const user = await this.checkIfUserExists(id);
        return user;
    }

    async findByEmail(email: string) {
        return await this.userRepository.findUnique({ email });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        this.validateDtos(updateUserDto);

        await this.checkIfUserExists(id);

        const { password } = updateUserDto;
        if (password)
            updateUserDto.password = await this.encrypter.hash(password);

        await this.userRepository.update(id, updateUserDto);
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

    private validateDtos({
        email,
        password
    }: CreateUserDto | UpdateUserDto) {
        if (email) this.validatorService.email(email);
        if (password) this.validatorService.password(password);
    }
}
