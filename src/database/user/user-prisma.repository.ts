import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import { User } from '@prisma/client';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateUserDto): Promise<void> {
        await this.prisma.user.create({
            data: dto
        })
    }

    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }
}
