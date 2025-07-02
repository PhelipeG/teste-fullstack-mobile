import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import {
  CreateActivityDTO,
  CreateActivitySchema,
} from './dto/create-activity.dto';
import {
  UpdateActivityDTO,
  UpdateActivitySchema,
} from './dto/update-activity.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@UseGuards(JwtAuthGuard)
@ApiTags('Activities')
@ApiBearerAuth()
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly service: ActivitiesService) {}

  @ApiOperation({ summary: 'Criar nova atividade física' })
  @Post()
  create(
    @CurrentUser() user,
    @Body(new ZodValidationPipe(CreateActivitySchema)) body: CreateActivityDTO,
  ) {
    return this.service.create(user.userId, body);
  }
  @ApiOperation({
    summary: 'Listar todas as atividades físicas do usuário logado',
  })
  @Get()
  findAll(@CurrentUser() user) {
    return this.service.findAll(user.userId);
  }
  @ApiOperation({ summary: 'Buscar atividade física por ID' })
  @Patch(':id')
  update(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateActivitySchema)) body: UpdateActivityDTO,
  ) {
    return this.service.update(user.userId, id, body);
  }
  @ApiOperation({ summary: 'Deletar atividade física por ID' })
  @Delete(':id')
  delete(@CurrentUser() user, @Param('id') id: string) {
    return this.service.delete(user.userId, id);
  }
  @ApiOperation({ summary: 'Resumo das atividades do usuário' })
  @Get('summary')
  getSummary(@CurrentUser() user: { userId: string }) {
    return this.service.getSummary(user.userId);
  }
}
