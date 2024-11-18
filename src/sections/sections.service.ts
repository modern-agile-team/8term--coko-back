import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  private async findSectionById(id: number) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section.id;
  }

  async create(sectionData: CreateSectionDto) {
    const { name } = sectionData;

    const section = await this.prisma.section.findUnique({
      where: {
        name,
      },
    });

    if (section) {
      throw new ConflictException();
    }

    return this.prisma.section.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return this.prisma.section.findMany();
  }

  async findOne(id: number) {
    const section = await this.prisma.section.findUnique({
      where: { id },
      include: { part: true },
    });

    if (!section) {
      throw new NotFoundException();
    }

    console.log(section);

    return section;
  }

  async update(id: number, sectionData: UpdateSectionDto) {
    const { name } = sectionData;

    await this.findSectionById(id);

    return this.prisma.section.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async remove(id: number) {
    await this.findSectionById(id);

    const part = await this.prisma.part.findMany({
      where: {
        sectionId: id,
      },
    });

    if (part.length) {
      throw new ConflictException('섹션을 참조하고 있는 파트가 있음');
    }

    return this.prisma.section.delete({
      where: {
        id,
      },
    });
  }
}
