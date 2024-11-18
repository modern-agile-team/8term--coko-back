import { Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryQuizDto } from './dto/query-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  private async findSectionById(id: number) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  private async findPartById(id: number) {
    const part = await this.prisma.part.findUnique({
      where: {
        id,
      },
    });

    if (!part) {
      throw new NotFoundException();
    }

    return part;
  }

  async create(data: CreateQuizDto) {
    const { partId } = data;

    await this.findPartById(partId);

    return this.prisma.quiz.create({
      data,
    });
  }

  async findAll(query: QueryQuizDto) {
    const { sectionId, partId } = query;

    if (sectionId) {
      await this.findSectionById(sectionId);
    }

    if (partId) {
      await this.findPartById(partId);
    }

    return this.prisma.quiz.findMany({
      where: {
        part: {
          ...(partId && { id: partId }),
          section: {
            ...(sectionId && { id: sectionId }),
          },
        },
      },
    });
  }

  async findQuizById(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException();
    }

    return quiz;
  }

  async update(id: number, data: UpdateQuizDto) {
    const { partId } = data;

    await this.findQuizById(id);

    await this.findPartById(partId);

    return this.prisma.quiz.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findQuizById(id);

    return this.prisma.quiz.delete({
      where: {
        id,
      },
    });
  }
}
