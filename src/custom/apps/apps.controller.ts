import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppsService } from './apps.service';
import { DeepPartial } from 'typeorm';
import { AppsEntity } from './apps.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

class CreateDto {
  @IsEmail()
  creator: string;
}

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  findAll() {
    return this.appsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appsService.findOne({
      id,
    });
  }

  @Post()
  create(@Body() dto: CreateDto) {
    return this.appsService.create(dto);
  }
}
