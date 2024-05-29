import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    private saltRounds = 10;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async getLastUserId(): Promise<number> {
        const lastUser = await this.usersRepository.find({
            order: { id: 'DESC' },
            take: 1
        });
        return lastUser[0] ? lastUser[0].id : 0; // Return 0 if no users exist
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User Not Found');
        }
        return user;
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOneBy({ username });

        if (!user) {
            throw new NotFoundException('User Not Found');
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        const role = createUserDto.role ?? 'student';
        const takenQuizes = [];
        const passwordHash = await bcrypt.hash(createUserDto.password, this.saltRounds);
        const username = this.generateUniqueUsername(createUserDto.fullName, await this.getLastUserId());

        const response = await this.usersRepository.save({
            ...createUserDto, username, role, takenQuizes, password: passwordHash
        });
        return response;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findById(id);
        if (user) {
            const passwordHash = await bcrypt.hash(updateUserDto.password, this.saltRounds);
            return this.usersRepository.update(id, {...updateUserDto, password: passwordHash});
        }
    }

    private generateUniqueUsername(fullname: string, id: number): string {
        const nameWithoutSpaces = fullname.replace(/\s+/g, '').toLowerCase();
        return `${nameWithoutSpaces}-${(id+1)}`;
    }
}
