import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePartDto } from './create-part.dto';
import { IsInt, IsString, Min } from 'class-validator';

export class UpdatePartDto extends PartialType(CreatePartDto) {
  @ApiPropertyOptional({
    description: '상위 섹션 id',
    example: 1,
  })
  @IsInt()
  @Min(0)
  readonly sectionId?: number;

  @ApiPropertyOptional({
    description: '파트 이름',
    example: 1,
  })
  @IsString()
  readonly name?: string;
}
