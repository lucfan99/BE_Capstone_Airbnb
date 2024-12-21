import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DatphongService } from './datphong.service';
import { CreateDatphongDto } from './dto/create-datphong.dto';
import { UpdateDatphongDto } from './dto/update-datphong.dto';
import { Response } from 'express';
import { DatphongDto } from './dto/datphong.dto';

@Controller('datphong')
export class DatphongController {
  constructor(private readonly datphongService: DatphongService) {}

  @Post('/api/dat-phong') 
  async create(
    @Body() createDatphongDto: CreateDatphongDto,
    @Res() res: Response
  ): Promise<Response<DatphongDto>> {
    const newRoom = await this.datphongService.create(createDatphongDto);
    return res.status(HttpStatus.CREATED).json(newRoom);
  }

  @Get('/all-phongdadat')
  async findAll(@Res() res: Response): Promise<Response<DatphongDto[]>> {
    const phongdadat = await this.datphongService.findAll();
    return res.status(HttpStatus.OK).json(phongdadat);
  }

  @Get('/api/dat-phong/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response<DatphongDto>> {
    const room = await this.datphongService.findOne(Number(id));
    if (!room) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Phòng không tồn tại' });
    }
    return res.status(HttpStatus.OK).json(room);
  }

  @Patch('/api/dat-phong/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDatphongDto: UpdateDatphongDto,
    @Res() res: Response
  ): Promise<Response<DatphongDto>> {
    const updateRoom = await this.datphongService.update(Number(id), updateDatphongDto);
    return res.status(HttpStatus.OK).json(updateRoom);
  }

  @Delete('/api/dat-phong/:id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const result = await this.datphongService.remove(Number(id));
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('/api/dat-phong/lay-theo-nguoi-dung/:maNguoiDung')
  async findByUser(
    @Param('maNguoiDung') maNguoiDung: string,
    @Res() res: Response,
  ): Promise<Response<DatphongDto[]>> {
    const bookings = await this.datphongService.findByUser(Number(maNguoiDung));
    if (bookings.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Không có đặt phòng cho người dùng này' });
    }
    return res.status(HttpStatus.OK).json(bookings);
  }



}
