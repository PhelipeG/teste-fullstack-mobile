import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO, UpdateUserSchema } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth() // Adiciona o esquema de autenticação Bearer para a documentação
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Ver perfil do usuário logado' })
  @Get('me')
  async getProfile(@CurrentUser() user) {
    return this.usersService.findById(user.userId);
  }

  @ApiOperation({ summary: 'Atualizar perfil do usuário logado' })
  @Patch()
  async update(
    @CurrentUser() user,
    @Body(new ZodValidationPipe(UpdateUserSchema)) body: UpdateUserDTO,
  ) {
    return this.usersService.update(user.userId, body);
  }
}
