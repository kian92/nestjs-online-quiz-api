import { Controller, Get, Post, Body, ValidationPipe, Param, ParseIntPipe, Put } from '@nestjs/common';
import { QuizQuestionsService } from './quiz-questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/update-question-dto';

@Controller('quiz-questions')
export class QuizQuestionsController {
    constructor(private readonly questionsService: QuizQuestionsService) {}

    @Get() // GET /quiz-questions
    getQuestions() {
        return this.questionsService.findAll();
    }

    @Get(':id') // GET /quiz-questions
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.questionsService.findById(id);
    }

    @Post() // POST /quiz-questions
    createNewQuestion(@Body(ValidationPipe) createQuestionDto: CreateQuestionDto) {
        return this.questionsService.createNewQuestion(createQuestionDto);
    }

    @Put('answer-options/:id') // PUT /quiz-questions/answer-options/1
    updateAnswerOptionsById(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQuestionDto: UpdateQuestionDto) {
        return this.questionsService.updateAnswerOptionsById(id, updateQuestionDto)
    }
}
