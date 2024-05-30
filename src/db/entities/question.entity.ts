import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'questions'})
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: string;

  @Column()
  questionName: string;

  @Column()
  questionDescription: string;

  @Column('json')
  answerOptions: any;

  @Column()
  correctAnswer: number

  @Column({ default: false })
  isPublished: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
