import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { RankingsService } from './rankings.service';
import { ApiRankings } from './ranking.swagger';
import { RankingQueryDto } from './dtos/ranking-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResRankingsDto } from './dtos/res-rankings.dto';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';

@ApiTags('rankings')
@Controller('users')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  // 랭킹 페이지 조회
  @ApiRankings.getSelectedPageRankings()
  @Get('rankings')
  @UseGuards(AuthGuard('accessToken'))
  async getSelectedPageRankings(
    @Query() rankingsDto: RankingQueryDto,
  ): Promise<ResRankingsDto> {
    const { sort, page } = rankingsDto;

    const allRankings = await this.rankingsService.getSelectedPageRankings(
      sort,
      page,
    );

    return allRankings;
  }

  // 자신의 랭킹 조회
  @ApiRankings.getMyRanking()
  @Get('me/rankings')
  @UseGuards(AuthGuard('accessToken'))
  async getMyRanking(
    @User() user: UserInfo,
    @Query('sort') sort: string,
  ): Promise<ResMyRankingDto> {
    const myRanking = await this.rankingsService.getMyRanking(sort, user);

    return myRanking;
  }
}
