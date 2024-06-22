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
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipAuth } from 'src/auth/custon-decorators/skip-auth.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuário')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Cadastrar usuário' })
    @SkipAuth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualizar usuário' })
    @ApiParam({
        name: 'id',
        description: 'ID do usuário',
        type: 'number'
    })
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.userService.update(id, updateUserDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Excluir usuário' })
    @ApiParam({
        name: 'id',
        description: 'ID do usuário',
        type: 'number'
    })
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.userService.remove(id);
    }
}
