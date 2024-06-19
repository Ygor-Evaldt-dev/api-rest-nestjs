import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from 'src/database/user/user.repository.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) { }

    async create(createUserDto: CreateUserDto) {
        await this.userRepository.create(createUserDto);
    }

    findAll() {
        return `This action returns all user`;
    }

    async findOne(id: number) {
        return this.userRepository.findById(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
