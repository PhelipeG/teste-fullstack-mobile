import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDTO } from './dto/create-activity.dto';
import { UpdateActivityDTO } from './dto/update-activity.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateActivityDTO) {
    return this.prisma.activity.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: string, activityId: string, data: UpdateActivityDTO) {
    const existing = await this.prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!existing || existing.userId !== userId)
      throw new NotFoundException('Atividade não encontrada');

    return this.prisma.activity.update({
      where: { id: activityId },
      data,
    });
  }

  async delete(userId: string, activityId: string) {
    const existing = await this.prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!existing || existing.userId !== userId)
      throw new NotFoundException('Atividade não encontrada');

    return this.prisma.activity.delete({
      where: { id: activityId },
    });
  }
  async getSummary(userId: string) {
    const activities = await this.prisma.activity.findMany({
      where: { userId },
    });
    if (activities.length === 0) {
      throw new NotFoundException('Nenhuma atividade encontrada');
    }
    const totalActivities = activities.length;
    const totalMinutes = activities.reduce((sum, act) => sum + act.duration, 0);
    const intensityBreakdown = {
      low: activities.filter((a) => a.intensity === 'low').length,
      medium: activities.filter((a) => a.intensity === 'medium').length,
      high: activities.filter((a) => a.intensity === 'high').length,
    };
    return { totalActivities, totalMinutes, intensityBreakdown };
  }
}
