import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/db/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/update-question-dto';

@Injectable()
export class QuizQuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository: Repository<Question>
    ) { }

    async findAll(): Promise<Question[]> {
        return await this.questionsRepository.find();
    }

    async findById(id: number): Promise<Question | null> {
        const question = await this.questionsRepository.findOneBy({ id });

        if (!question) {
            throw new NotFoundException('Question Not Found');
        }

        return question;
    }

    async createNewQuestion(createQuestionDto: CreateQuestionDto) {
        const jsonAnswerOptions = JSON.stringify(createQuestionDto.answerOptions);
        const response = await this.questionsRepository.save({...createQuestionDto, answerOptions: jsonAnswerOptions});

        return response;
    }

    async updateAnswerOptionsById(id: number, updateQuestionDto: UpdateQuestionDto) {
        const question = await this.findById(id);
        question.answerOptions = JSON.stringify(updateQuestionDto.answerOptions);

        if (question) {
            return this.questionsRepository.update(id, { answerOptions: question.answerOptions });
        }
    }
}
