import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AppType {
  Quiz = 'quiz',
}

@Entity()
export class AppsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: AppType })
  type: AppType;

  @Column({ type: 'json' })
  content: object;

  @Column()
  creator: string;
}
