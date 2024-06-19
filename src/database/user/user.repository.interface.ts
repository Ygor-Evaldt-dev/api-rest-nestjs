import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

export interface IUserRepository {
    create(dto: CreateUserDto): Promise<void>
    findById(id: number): Promise<User | null>;
}
