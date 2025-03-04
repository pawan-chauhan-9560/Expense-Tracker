import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  description!: string;

  @Column('decimal')
  amount!: number;

  @Column()
  category!: string;

  @Column('date')
  date!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  user_id!: number;
}