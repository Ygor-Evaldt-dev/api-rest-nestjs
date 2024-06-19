import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

export interface IUserRepository {
    create(dto: CreateUserDto): Promise<void>;
    findUnique(params: { id?: number, email?: string }): Promise<User | null>;
    update(id: number, dto: UpdateUserDto): Promise<void>;
}
