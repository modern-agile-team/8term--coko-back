import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsRepository } from './rankings.repository';
import { RankingsService } from './rankings.service';
import { UsersCoreModule } from 'src/users/modules/users-core.module';
import { UsersRankingsController } from './user-rankings.controller';

@Module({
  imports: [UsersCoreModule],
  controllers: [RankingsController, UsersRankingsController],
  providers: [RankingsService, RankingsRepository],
})
export class RankingsModule {}
