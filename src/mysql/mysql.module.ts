import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from '../admin/contact/contact.entity';
import { GalleryEntity } from '../admin/gallery/gallery.entity';
import { TelegramEntity } from '../admin/telegram/telegram.entity';
import { CmsEntity } from '../cms/cms/cms.entity';
import { PageEntity } from '../cms/page/page.entity';
import { NavigationEntity } from '../cms/navigation/navigation.entity';
import { AppsEntity } from '../apps/apps.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: ['error'],
      // logger: 'debug',
      entities: [
        ContactEntity,
        GalleryEntity,
        TelegramEntity,
        CmsEntity,
        PageEntity,
        NavigationEntity,
        AppsEntity,
      ],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class MysqlModule {}
