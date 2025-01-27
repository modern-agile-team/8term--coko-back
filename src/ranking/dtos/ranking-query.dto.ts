import { IsEnum, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Sort, SortValues } from '../entities/ranking.entity';
import { PaginationDefaults } from 'src/common/constants/rankings-constants';
import { RankingSortDto } from './ranking-sort.dto';

export class RankingQueryDto extends RankingSortDto {
  @ApiPropertyOptional({
    description: '페이지 번호 (1부터 시작)',
    example: 1,
    default: PaginationDefaults.PAGE_NUMBER,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number = PaginationDefaults.PAGE_NUMBER;

  @ApiPropertyOptional({
    description: '페이지 크기',
    example: 5,
    default: PaginationDefaults.PAGE_LIMIT,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit: number = PaginationDefaults.PAGE_LIMIT;
}
