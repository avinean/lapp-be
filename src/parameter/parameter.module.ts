import { Module } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ParameterController } from './parameter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterEntity } from './parameter.entity';

@Module({
  providers: [ParameterService],
  controllers: [ParameterController],
  imports: [TypeOrmModule.forFeature([ParameterEntity])],
})
export class ParameterModule {}
