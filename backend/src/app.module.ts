import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [AuthModule, UsersModule, ActivitiesModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
