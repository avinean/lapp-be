import { Body, Controller, Put } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import { TelegramMessage } from './dto';
import { UtilService } from './util.service';
import { TelegramService } from 'src/admin/telegram/telegram.service';

const unlinkAsync = promisify(fs.unlink);

@ApiTags('Util')
@Controller('util')
export class UtilController {
  constructor(
    private readonly utilService: UtilService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: '.',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `/uploads/${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addAvatar(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Put('photo/:name')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: '.',
        filename: async (req, file, cb) => {
          const oldFilePath = `.${req.params.name}`;

          try {
            await unlinkAsync(oldFilePath);
          } catch (error) {
            if (error.code !== 'ENOENT') {
              throw error;
            }
          }

          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          const newFileName = `/uploads/${randomName}${extname(file.originalname)}`;
          const newFilePath = `.${newFileName}`;

          cb(null, newFileName);

          return newFilePath;
        },
      }),
    }),
  )
  async updateAvatar(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Post('message')
  async sendMessage(@Body() body: TelegramMessage) {
    this.telegramService.message(body);
  }
}
