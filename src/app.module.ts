import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './db/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { QuizQuestionsModule } from './quiz-questions/quiz-questions.module';
import { Question } from './db/entities/question.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Question],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    QuizQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
