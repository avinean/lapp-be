import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TelegramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @Column()
  botApiKey: string;

  @Column()
  userIds: string;

  @Column()
  link: string;
}
