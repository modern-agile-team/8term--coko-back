import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
