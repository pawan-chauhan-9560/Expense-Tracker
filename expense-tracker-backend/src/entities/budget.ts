import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  category!: string;

  @Column('decimal')
  limit!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}