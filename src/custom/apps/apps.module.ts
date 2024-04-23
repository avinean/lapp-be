import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsEntity } from './apps.entity';
import { MailModule } from 'src/core/mail/mail.module';

@Module({
  providers: [AppsService],
  controllers: [AppsController],
  imports: [TypeOrmModule.forFeature([AppsEntity]), MailModule],
})
export class AppsModule {}
