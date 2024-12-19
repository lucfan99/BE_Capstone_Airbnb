import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { PhongDto } from './dto/phong.dto';
import { Response } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Post()
  async create(
    @Body() createPhongDto: CreatePhongDto,
    @Res() res: Response,
  ): Promise<Response<PhongDto>> {
    const newRoom = await this.phongService.create(createPhongDto);
    return res.status(HttpStatus.CREATED).json(newRoom);
  }

  @Get('/all-rooms')
  async findAll(@Res() res: Response): Promise<Response<PhongDto[]>> {
    const phongs = await this.phongService.findAll();
    return res.status(HttpStatus.OK).json(phongs);
  }

  @Get('/phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async findRoom(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<PhongDto[]>> {
    const formatPageIndex = pageIndex ? Number(pageIndex) : 1;
    const formatPageSize = pageSize ? Number(pageSize) : 10;
    let rooms = await this.phongService.findRoom(
      formatPageIndex,
      formatPageSize,
      keyword,
    );
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<PhongDto>> {
    try {
      const roomid = await this.phongService.findOne(+id);
      if (!roomid) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${id} not found` });
      }
      return res.status(HttpStatus.OK).json(roomid);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred', error });
    }
  }

  @Get('/search-by-name')
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async findByName(
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<PhongDto[]>> {
    try {
      let rooms = await this.phongService.findName(keyword);
      if (!rooms) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${keyword} is not found` });
      }
      return res.status(HttpStatus.OK).json(rooms);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhongDto: UpdatePhongDto) {
    return this.phongService.update(+id, updatePhongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phongService.remove(+id);
  }
}
