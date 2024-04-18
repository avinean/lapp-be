import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppsEntity } from './apps.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(AppsEntity)
    private readonly appsRepository: Repository<AppsEntity>,
    private readonly mailService: MailService,
  ) {}

  findAll(where?: FindOptionsWhere<AppsEntity>) {
    return this.appsRepository.find({ where });
  }

  findOne(where?: FindOptionsWhere<AppsEntity>) {
    return this.appsRepository.findOne({ where });
  }

  async create(dto: DeepPartial<AppsEntity>) {
    const app = await this.appsRepository.save(this.appsRepository.create(dto));
    this.mailService.appConfirmation(app);
    return app;
  }
}
