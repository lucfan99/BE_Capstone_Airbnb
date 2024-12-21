import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateDatphongDto } from './dto/create-datphong.dto';
import { UpdateDatphongDto } from './dto/update-datphong.dto';
import { DatphongDto } from './dto/datphong.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DatphongService {
  prisma = new PrismaClient();

  // Tạo đặt phòng mới
  async create(createDatphongDto: CreateDatphongDto): Promise<DatphongDto> {
    try {
      const newBooking = await this.prisma.datPhong.create({
        data: createDatphongDto,
      });
      return plainToClass(DatphongDto, newBooking);
    } catch (error) {
      throw new HttpException(
        `Error creating booking: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Lấy danh sách tất cả đặt phòng
  async findAll(): Promise<DatphongDto[]> {
    try {
      const bookings = await this.prisma.datPhong.findMany();
      return bookings.map((booking) => plainToClass(DatphongDto, booking));
    } catch (error) {
      throw new HttpException(
        `Error fetching bookings: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Tìm đặt phòng theo ID
  async findOne(id: number): Promise<DatphongDto> {
    try {
      const booking = await this.prisma.datPhong.findUnique({ where: { id } });
      if (!booking) {
        throw new HttpException(
          `Booking with id=${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return plainToClass(DatphongDto, booking);
    } catch (error) {
      throw new HttpException(
        `Error fetching booking: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Tìm đặt phòng theo từ khóa (ví dụ: tìm theo tên khách)
  async findByKeyword(
    keyword: string,
  ): Promise<DatphongDto[]> {
    try {
      const bookings = await this.prisma.datPhong.findMany({
        where: keyword
          ? {
              guestName: {
                contains: keyword,
              },
            }
          : undefined,
      });
      return bookings.map((booking) => plainToClass(DatphongDto, booking));
    } catch (error) {
      throw new HttpException(
        `Error fetching bookings by keyword: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Cập nhật đặt phòng theo ID
  async update(
    id: number,
    updateDatphongDto: UpdateDatphongDto,
  ): Promise<DatphongDto> {
    try {
      const updatedBooking = await this.prisma.datPhong.update({
        where: { id },
        data: updateDatphongDto,
      });
      return plainToClass(DatphongDto, updatedBooking);
    } catch (error) {
      throw new HttpException(
        `Error updating booking: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Xóa đặt phòng theo ID
  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.datPhong.delete({ where: { id } });
      return { message: 'Booking deleted successfully' };
    } catch (error) {
      throw new HttpException(
        `Error deleting booking: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


 // Tìm đặt phòng theo mã người dùng
  async findByUser(maNguoiDung: number): Promise<DatphongDto[]> {
    try {
      const bookings = await this.prisma.datPhong.findMany({
        where: {
          ma_nguoi_dat: maNguoiDung, // Điều kiện tìm theo ma_nguoi_dat
        },
      });
      return bookings.map((booking) => plainToClass(DatphongDto, booking));
    } catch (error) {
      throw new HttpException(
        `Error fetching bookings by user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


