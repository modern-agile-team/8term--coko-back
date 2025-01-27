import { ApiPropertyOptional } from '@nestjs/swagger';
import { Sort, SortValues } from '../entities/ranking.entity';
import { IsEnum } from 'class-validator';

export class RankingSortDto {
  @ApiPropertyOptional({
    description: '랭킹 기준값 (level, point 등))',
    example: 'level',
    enum: SortValues,
    default: SortValues.LEVEL,
  })
  @IsEnum(SortValues, { message: 'bad Sort value' })
  readonly sort: Sort = SortValues.LEVEL; // 여기 들어가는 기본 값은 사용자가 처음 들어왔을때 보여줄 페이지
}
