import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return await this.prisma.nguoiDung.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new Error();
    }
  }
  async findAll() {
    try {
      let users = await this.prisma.nguoiDung.findMany();
      return users.map((user) => plainToClass(UserDto, user));
    } catch (error) {
      throw new Error();
    }
  }
  async findUser(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<UserDto[]> {
    try {
      const users = await this.prisma.nguoiDung.findMany({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        where: keyword
          ? {
              name: {
                contains: keyword,
              },
            }
          : undefined,
      });
      return users.map((user) => plainToClass(UserDto, user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<UserDto> {
    try {
      const user = await this.prisma.nguoiDung.findUnique({ where: { id } });
      if (!user) {
        throw new Error(`User with id=${id} is not found`);
      }
      return plainToClass(UserDto, user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findName(keyword: string): Promise<UserDto[]> {
    try {
      const username = await this.prisma.nguoiDung.findMany({
        where: keyword
          ? {
              name: {
                contains: keyword,
              },
            }
          : undefined,
      });
      return username.map((user) => plainToClass(UserDto, user));
    } catch (error) {
      throw new HttpException(
        `Error fetching users by name: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const updatedUser = await this.prisma.nguoiDung.update({
        where: { id },
        data: updateUserDto,
      });

      return plainToClass(UserDto, updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.nguoiDung.delete({
        where: { id },
      });
      return { message: 'Delete user successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
