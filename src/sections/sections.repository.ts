import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './entities/section.entity';
import { SectionParts, SectionPartsPartProgress } from 'src/common/type/type';
import { QuerySectionDto } from './dto/query-section.dto';

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSections(): Promise<Section[]> {
    return this.prisma.section.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findSectionsByCursorQuery(query: QuerySectionDto) {
    const { cursor, pageSize = 1 } = query;

    return this.prisma.section.findMany({
      where: cursor ? { id: { gt: cursor } } : undefined,
      orderBy: { order: 'asc' },
      take: pageSize + 1, // 다음 페이지가 있는지 확인하기 위해 +1
    });
  }

  async findOneSectionById(id: number): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { id },
    });
  }

  async findSectionWithPartsById(id: number): Promise<SectionParts> {
    return this.prisma.section.findUnique({
      where: { id },
      include: {
        part: { orderBy: { order: 'asc' } },
      },
    });
  }

  async findSectionWithPartStatus(
    userId: number,
    id: number,
  ): Promise<SectionPartsPartProgress> {
    return this.prisma.section.findUnique({
      where: { id },
      include: {
        part: {
          include: {
            PartProgress: {
              where: { userId },
              select: { status: true },
            },
          },
        },
      },
    });
  }

  async findOneSectionByName(name: string): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { name },
    });
  }

  async findSectionMaxOrder(): Promise<number> {
    const result = await this.prisma.section.aggregate({
      _max: { order: true },
    });
    return result._max.order ?? 0;
  }

  async createSection(
    data: CreateSectionDto & { order: number },
  ): Promise<Section> {
    return this.prisma.section.create({ data });
  }

  async updateSectionById(
    id: number,
    data: CreateSectionDto,
  ): Promise<Section> {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async deleteSectionById(id: number): Promise<Section> {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
