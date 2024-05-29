import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string

  @Column("simple-array")
  takenQuizes: Array<any>

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
