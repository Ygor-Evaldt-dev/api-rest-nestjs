import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
        private readonly encrypter: IEncrypter
    ) { }

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await this.encrypter.hash(createUserDto.password);
        await this.userRepository.create(createUserDto);
    }

    async findById(id: number) {
        return await this.userRepository.findUnique({ id });
    }

    async findByEmail(email: string) {
        return await this.userRepository.findUnique({ email });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
