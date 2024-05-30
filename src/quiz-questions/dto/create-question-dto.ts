import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    questionId: string;

    @IsString()
    questionName: string;

    @IsString()
    questionDescription: string;

    answerOptions: Option;

    correctAnswer: number;

    isPublished: boolean;
}

class Option {
    optionId: number;

    @IsString()
    optionDescription: string;

    isCorrect: boolean;
}
