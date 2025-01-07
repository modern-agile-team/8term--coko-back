import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsInt, Min } from 'class-validator';

export class ItemChangeStatusDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: '아이템 ID',
    example: 4,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  itemId: number;
}

export class BuyItemDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: '아이템 ID 배열',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty() //비어있는 배열 있으면 안된다
  @IsInt({ each: true }) //배열 내 각 요소(each) 정수
  @Min(1, { each: true }) //배열 내 각 요소(each) 최소값
  itemIds: number[];
}
