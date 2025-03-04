import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // <--- Notice the '!' here

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
