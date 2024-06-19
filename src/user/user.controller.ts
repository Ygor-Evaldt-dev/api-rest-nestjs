import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    HttpException,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findById(id);
        if (user === null)
            throw new HttpException("Usuario não cadastrado", HttpStatus.NOT_FOUND);

        return user;
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.userService.findById(id);
        if (!user)
            throw new HttpException("Usuário não cadastrado", HttpStatus.NOT_FOUND);

        await this.userService.update(id, updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findById(id);
        if (!user)
            throw new HttpException("Usuário não cadastrado", HttpStatus.NOT_FOUND);

        return this.userService.remove(id);
    }
}
