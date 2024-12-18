import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVitriDto } from './dto/create-vitri.dto';
import { UpdateVitriDto } from './dto/update-vitri.dto';
import { PrismaClient } from '@prisma/client';
import { VitriDto } from './dto/vitri.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class VitriService {
  prisma = new PrismaClient();
  async create(createVitriDto: CreateVitriDto): Promise<VitriDto> {
    try {
      return await this.prisma.viTri.create({
        data: createVitriDto,
      });
    } catch (error) {
      throw new Error();
    }
  }

  async findAll() {
    try {
      let vitris = await this.prisma.viTri.findMany();
      return vitris.map((vitri) => plainToClass(VitriDto, vitri));
    } catch (error) {
      throw new Error();
    }
  }

  async findOne(id: number): Promise<VitriDto> {
    try {
      const vitri = await this.prisma.viTri.findUnique({
        where: { id },
      });
      if (!vitri) {
        throw new Error(`ViTri ${id} is not found`);
      }
      return plainToClass(VitriDto, vitri);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findLocation(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<VitriDto[]> {
    try {
      let locations = await this.prisma.viTri.findMany({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        where: keyword
          ? {
              ten_vi_tri: {
                contains: keyword,
              },
            }
          : {},
      });
      return locations.map((location) => plainToClass(VitriDto, location));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findName(keyword: string): Promise<VitriDto[]> {
    try {
      const locationname = await this.prisma.nguoiDung.findMany({
        where: keyword
          ? {
              name: {
                contains: keyword,
              },
            }
          : undefined,
      });
      return locationname.map((location) => plainToClass(VitriDto, location));
    } catch (error) {
      throw new HttpException(
        `Error fetching users by name: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: number, updateVitriDto: UpdateVitriDto): Promise<VitriDto> {
    try {
      const updateViTri = await this.prisma.viTri.update({
        where: { id },
        data: updateVitriDto,
      });
      return plainToClass(VitriDto, updateViTri);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.viTri.delete({ where: { id } });
      return { message: 'Delete successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
