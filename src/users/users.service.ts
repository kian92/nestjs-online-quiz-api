import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    createUser(createUserDto: CreateUserDto) {
        const username = createUserDto.fullName;
        const role = 'student';
        const takenQuizes = [];
        const newUser = {
            ...createUserDto, username, role, takenQuizes
        };

        return this.usersRepository.save(newUser);
    }
}
