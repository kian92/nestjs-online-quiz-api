import { Module } from '@nestjs/common';
import { QuizQuestionsController } from './quiz-questions.controller';
import { QuizQuestionsService } from './quiz-questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/db/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuizQuestionsController],
  providers: [QuizQuestionsService]
})
export class QuizQuestionsModule {}
