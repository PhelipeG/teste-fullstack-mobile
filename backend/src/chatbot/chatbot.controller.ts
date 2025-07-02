import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import {
  CreateMessageDto,
  CreateMessageSchema,
} from './dto/create-message.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@ApiTags('Chatbot')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async chat(
    @CurrentUser() user: User,
    @Body(new ZodValidationPipe(CreateMessageSchema)) body: CreateMessageDto,
  ) {
    const reply = await this.chatbotService.getResponse(body.message);
    return { reply };
  }
}
