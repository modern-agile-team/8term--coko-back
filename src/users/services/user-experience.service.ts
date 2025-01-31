import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateExperienceDto } from '../dtos/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseExperienceDto } from '../dtos/response-experience.dto';
import {
  INCREASE_MULTIPLIER,
  LEVEL_UP,
} from '../constants/user-experience.constant';

@Injectable()
export class UserExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserExperience(id: number): Promise<ResponseExperienceDto> {
    const userExperience = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExperience) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return new ResponseExperienceDto(userExperience);
  }

  async updateExperience(
    id: number,
    updateExperienceData: UpdateExperienceDto,
  ): Promise<ResponseExperienceDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`id ${id} not found`);
    }

    const { userLevel, userExperience, experienceForNextLevel } =
      this.calculateLevel(
        user.level,
        user.experience,
        user.experienceForNextLevel,
        updateExperienceData.experience,
      );

    const updatedExperience = await this.prisma.user.update({
      where: { id },
      data: {
        level: userLevel,
        experience: userExperience,
        experienceForNextLevel: experienceForNextLevel,
      },
    });
    return new ResponseExperienceDto(updatedExperience);
  }

  private calculateLevel(
    userLevel: number,
    userExperience: number,
    experienceForNextLevel: number,
    updateExperience: number,
  ) {
    userExperience += updateExperience;
    while (userExperience >= experienceForNextLevel) {
      userLevel += LEVEL_UP;
      userExperience -= experienceForNextLevel;
      experienceForNextLevel = Math.floor(
        experienceForNextLevel * INCREASE_MULTIPLIER,
      );
    }
    return { userLevel, userExperience, experienceForNextLevel };
  }
}
