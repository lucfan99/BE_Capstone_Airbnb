import { Injectable } from '@nestjs/common';
import { CreateBinhluanDto } from './dto/create-binhluan.dto';
import { UpdateBinhluanDto } from './dto/update-binhluan.dto';
import { PrismaClient } from '@prisma/client';
import { BinhLuanDto } from './dto/binhluan.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BinhluanService {
  prisma = new PrismaClient();
  async create(createBinhluanDto: CreateBinhluanDto): Promise<BinhLuanDto> {
    try {
      return await this.prisma.binhLuan.create({
        data: createBinhluanDto,
      });
    } catch (error) {
      throw new Error();
    }
  }

  async findAll() {
    try {
      let comments = await this.prisma.binhLuan.findMany();
      return comments.map((comment) => plainToClass(BinhLuanDto, comment));
    } catch (error) {
      throw new Error();
    }
  }

  async findOne(id: number): Promise<BinhLuanDto> {
    try {
      const comment = await this.prisma.binhLuan.findUnique({ where: { id } });
      if (!comment) {
        throw new Error(`Comment with id=${id} is not found`);
      }
      return plainToClass(BinhLuanDto, comment);
    } catch (error) {
      throw new Error();
    }
  }

  async update(
    id: number,
    updateBinhluanDto: UpdateBinhluanDto,
  ): Promise<BinhLuanDto> {
    try {
      const updateComment = await this.prisma.binhLuan.update({
        where: { id },
        data: updateBinhluanDto,
      });
      return plainToClass(BinhLuanDto, updateComment);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.binhLuan.delete({
        where: { id },
      });
      return { message: 'Delete comment successfully' };
    } catch (error) {}
  }
}
