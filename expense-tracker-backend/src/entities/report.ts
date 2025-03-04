import { Entity, PrimaryGeneratedColumn, CreateDateColumn,Column, UpdateDateColumn } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  user_id!: number;
}