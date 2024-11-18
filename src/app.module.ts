import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserPointModule } from './users/modules/user-point.module';
import { UserExperienceModule } from './users/modules/user-experience.module';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/modules/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { SectionsModule } from './sections/sections.module';
import { ProgressModule } from './progress/progress.module';
import { PartsModule } from './parts/parts.module';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    QuizzesModule,
    SectionsModule,
    PrismaModule,
    UsersModule,
    UserPointModule,
    UserExperienceModule,
    ProgressModule,
    PartsModule,
    ItemsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
