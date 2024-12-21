import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { Phong, PrismaClient } from '@prisma/client';
import { PhongDto } from './dto/phong.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PhongService {
  prisma = new PrismaClient();

  async create(createPhongDto: CreatePhongDto): Promise<PhongDto> {
    try {
      return await this.prisma.phong.create({
        data: createPhongDto,
      });
    } catch (error) {
      throw new Error();
    }
  }
  async findAll() {
    try {
      let rooms = await this.prisma.phong.findMany();
      return rooms.map((room) => plainToClass(PhongDto, room));
    } catch (error) {
      throw new Error();
    }
  }

  async findRoom(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<PhongDto[]> {
    try {
      let rooms = await this.prisma.phong.findMany({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        where: keyword
          ? {
              ten_phong: {
                contains: keyword,
              },
            }
          : {},
      });
      return rooms.map((phong) => plainToClass(PhongDto, phong));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findRoomByLocationID(id: number): Promise<PhongDto[]> {
    try {
      const rooms = await this.prisma.phong.findMany({
        where: { vi_tri_id: id },
      });
      if (!rooms) {
        throw new Error(`Room with id=${id} is not found`);
      }
      return rooms.map((cm) => plainToClass(PhongDto, cm));
    } catch (error) {
      throw new Error();
    }
  }

  async findOne(id: number): Promise<PhongDto> {
    try {
      const room = await this.prisma.phong.findUnique({ where: { id } });
      if (!room) {
        throw new Error(`Room with id=${id} is not found`);
      }
      return plainToClass(PhongDto, room);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findName(keyword: string): Promise<PhongDto[]> {
    try {
      const roomname = await this.prisma.phong.findMany({
        where: keyword
          ? {
              ten_phong: {
                contains: keyword,
              },
            }
          : undefined,
      });
      return roomname.map((phong) => plainToClass(PhongDto, phong));
    } catch (error) {
      throw new HttpException(
        `Error fetching rooms by name: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePhongDto: UpdatePhongDto): Promise<PhongDto> {
    try {
      const updatedRoom = await this.prisma.phong.update({
        where: { id },
        data: updatePhongDto,
      });

      return plainToClass(PhongDto, updatedRoom);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.phong.delete({
        where: { id },
      });
      return { message: 'Delete room successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
