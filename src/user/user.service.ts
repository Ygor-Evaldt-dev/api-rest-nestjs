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

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('IEncrypter')
        private readonly encrypter: IEncrypter,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;

        const userWithSameEmail = await this.userRepository.findUnique({
            email,
        });
        if (userWithSameEmail)
            throw new ConflictException('Usuário já cadastrado');


        createUserDto.password = await this.encrypter.hash(password);
        await this.userRepository.create(createUserDto);
    }

    async findById(id: number) {
        return await this.existingUser(id);
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findUnique({ email });
        if (!user) throw new NotFoundException('Usuário não cadastrado');

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.existingUser(id);

        const { password } = updateUserDto;
        if (password)
            updateUserDto.password = await this.encrypter.hash(password);

        await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        await this.existingUser(id);
        await this.userRepository.delete(id);
    }

    private async existingUser(id: number) {
        const user = await this.userRepository.findUnique({ id });
        if (!user) throw new NotFoundException('Usuário não cadastrado');

        return user;
    }
}
