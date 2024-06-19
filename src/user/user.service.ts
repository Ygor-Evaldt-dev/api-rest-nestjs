import {
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
    ) {}

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await this.encrypter.hash(
            createUserDto.password,
        );
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
        await this.checkIfUserExists(id);
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
}
