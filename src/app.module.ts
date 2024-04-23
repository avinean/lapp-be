import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './core/auth/auth.module';
import { UtilModule } from './admin/util/util.module';
import { ContactModule } from './admin/contact/contact.module';
import { GalleryModule } from './admin/gallery/gallery.module';
import { TelegramModule } from './admin/telegram/telegram.module';
import { CmsModule } from './cms/cms/cms.module';
import { PageModule } from './cms/page/page.module';
import { NavigationModule } from './cms/navigation/navigation.module';
import { AppsModule } from './apps/apps.module';
import { MailModule } from './core/mail/mail.module';
import { MysqlModule } from './mysql/mysql.module';

@Module({
  imports: [
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
    MysqlModule,
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
