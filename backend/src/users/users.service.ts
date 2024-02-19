import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError, FindOneOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { hashValue } from 'src/helpers/hash';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    try {
      const userHash = await this.userRepository.create({
        ...createUserDto,
        password: await hashValue(password),
      });
      return await this.userRepository.save(userHash);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ServerException(ErrorCode.ConflictAlreadyExistsUser);
      }
    }
  }

  findOwn(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new ServerException(ErrorCode.NotFoundUser);
    }
    return user;
  }

  async findUserWishes(id: number): Promise<Wish[]> {
    const wishes = await this.wishRepository.find({
      where: { owner: { id } },
    });
    if (!wishes) {
      throw new ServerException(ErrorCode.NotFoundWishes);
    }
    return wishes;
  }

  async findQuery(query: string): Promise<User[]> {
    const user = await this.userRepository.find({
      where: [{ email: query }, { username: query }],
    });
    if (user.length > 0) {
      return user;
    } else {
      throw new ServerException(ErrorCode.NotFoundUser);
    }
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const username = await this.findQuery(updateUserDto.username);

      if (username) {
        throw new ServerException(ErrorCode.BadRequestAlreadyExistsUser);
      }
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const useremail = await this.findQuery(updateUserDto.email);

      if (useremail) {
        throw new ServerException(ErrorCode.BadRequestAlreadyExistsEmail);
      }
    }

    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = await hashValue(password);
    }
    return this.userRepository.save({
      ...user,
      updatedAt: new Date(),
      ...updateUserDto,
    });
  }

  async removeById(id: number) {
    return this.userRepository.delete({ id });
  }
}
