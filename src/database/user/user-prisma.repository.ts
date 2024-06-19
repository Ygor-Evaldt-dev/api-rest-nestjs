import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateUserDto): Promise<void> {
        await this.prisma.user.create({
            data: dto,
        });
    }

    async findUnique(params: { id?: number, email?: string }): Promise<User | null> {
        const { id, email } = params;

        if (id)
            return await this.prisma.user.findUnique({ where: { id } });
        else if (email)
            return await this.prisma.user.findUnique({ where: { email } });

        return null;
    }

    async update(id: number, dto: UpdateUserDto): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: dto,
        });
    }
}
