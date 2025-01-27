import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class ResponseUserDto {
  @ApiProperty({ example: 20 })
  readonly id: number;

  // @ApiProperty({ example: 'google' })
  readonly provider: string;

  // @ApiProperty({ example: '1067133746743816635' })
  readonly providerId: string;

  @ApiProperty({ example: '이건우' })
  readonly name: string;

  @ApiProperty({ example: 6 })
  readonly level: number;

  @ApiProperty({ example: 128 })
  readonly experience: number;

  @ApiProperty({ example: 150 })
  readonly experienceForNextLevel: number;

  @ApiProperty({ example: 4800 })
  readonly point: number;

  @ApiProperty({ example: '2025-01-22T02:20:18.611Z' })
  readonly createdAt: Date;

  // @ApiProperty({ example: '2025-01-23T07:16:34.611Z' })
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
    this.point = user.point;
    this.createdAt = user.createdAt;
  }
}
