import { ApiProperty } from '@nestjs/swagger';
import { UserRankingDto } from './user-ranking.dto';
import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';

export class RankingPaginationResponseDto extends OffsetPaginationBaseResponseDto<UserRankingDto> {
  @ApiProperty({
    description: '조회된 랭킹 목록',
  })
  readonly contents: UserRankingDto[];

  constructor(props: Omit<RankingPaginationResponseDto, 'totalPage'>) {
    super(props);
    this.contents = props.contents;
  }
}
