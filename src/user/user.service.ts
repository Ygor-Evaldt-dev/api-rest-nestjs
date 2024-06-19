import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from 'src/database/user/user.repository.interface';
import { IEncrypter } from 'src/ports/encrypter.interface';

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
        const user = await this.userRepository.findUnique({ id });
        if (!user)
            throw new HttpException("Usuario não cadastrado", HttpStatus.NOT_FOUND);

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findUnique({ email });
        if (!user)
            throw new HttpException("Usuario não cadastrado", HttpStatus.NOT_FOUND);

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const exists = await this.userRepository.findUnique({ id });
        if (!exists)
            throw new HttpException("Usuário não cadastrado", HttpStatus.NOT_FOUND);

        await this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
