import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './guards/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UtilModule } from './util/util.module';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './contact/contact.entity';
import { GalleryModule } from './gallery/gallery.module';
import { GalleryEntity } from './gallery/gallery.entity';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramEntity } from './telegram/telegram.entity';
import { CmsModule } from './cms/cms.module';
import { CmsEntity } from './cms/cms.entity';
import { PageModule } from './page/page.module';
import { PageEntity } from './page/page.entity';
import { NavigationEntity } from './navigation/navigation.entity';
import { NavigationModule } from './navigation/navigation.module';
import { AppsEntity } from './apps/apps.entity';
import { AppsModule } from './apps/apps.module';
import { MailModule } from './mail/mail.module';

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
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/(.*)'],
    }),
    AuthModule,
    UtilModule,
    ContactModule,
    GalleryModule,
    TelegramModule,
    CmsModule,
    PageModule,
    NavigationModule,
    AppsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    JwtService,
    AppService,
  ],
})
export class AppModule {}
