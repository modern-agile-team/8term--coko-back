import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRankingsDto } from './dtos/user-rankings.dto';

@Injectable()
export class RankingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 모든 유저 수
  async getTotalUserCount(): Promise<number> {
    return await this.prisma.user.count();
  }

  // 선택한 페이지 랭킹 정보
  async getSelectedPageRankingsInfo(
    page: number,
    pageSize: number,
    orderBy: object,
  ): Promise<UserRankingsDto[]> {
    const results = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize, // 건너뛸 항목 수 계산
      take: pageSize, // 가져올 항목 수
      select: { id: true, name: true, point: true, level: true }, // 가져올 내용
      orderBy,
    });

    return results;
  }

  // 나보다 높은 순위인 유저 수
  async getHigherRankCount(filterType: object): Promise<number> {
    const higherRankCount = await this.prisma.user.count({
      where: filterType,
    });

    return higherRankCount;
  }
}
