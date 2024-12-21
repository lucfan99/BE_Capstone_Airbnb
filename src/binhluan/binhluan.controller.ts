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
import { BinhluanService } from './binhluan.service';
import { CreateBinhluanDto } from './dto/create-binhluan.dto';
import { UpdateBinhluanDto } from './dto/update-binhluan.dto';
import { request, Response } from 'express';
import { BinhLuanDto } from './dto/binhluan.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('binhluan')
export class BinhluanController {
  constructor(private readonly binhluanService: BinhluanService) {}

  //
  @Get('/all-comment')
  async findAllComment(@Res() res: Response): Promise<Response<BinhLuanDto[]>> {
    let comments = await this.binhluanService.findAll();
    return res.status(HttpStatus.OK).json(comments);
  }

  @Post()
  async create(
    @Body() createBinhluanDto: CreateBinhluanDto,
    @Res() res: Response,
  ): Promise<Response<BinhLuanDto>> {
    let newComment = await this.binhluanService.create(createBinhluanDto);
    return res.status(HttpStatus.CREATED).json(newComment);
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: string,
  //   @Res() res: Response,
  // ): Promise<Response<BinhLuanDto>> {
  //   try {
  //     const comment = await this.binhluanService.findOne(+id);
  //     if (!comment) {
  //       return res
  //         .status(HttpStatus.NOT_FOUND)
  //         .json({ message: `${id} not found` });
  //     }
  //     return res.status(HttpStatus.OK).json(comment);
  //   } catch (error) {
  //     return res
  //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //       .json({ message: 'An error occured', error });
  //   }
  // }

  @Get('/lay-theo-ma-phong/:id')
  async findCommentByRoomID(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BinhLuanDto>> {
    try {
      const comment = await this.binhluanService.findByRoomID(+id);
      if (!comment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${id} not found` });
      }
      return res.status(HttpStatus.OK).json(comment);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occured', error });
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBinhluanDto: UpdateBinhluanDto,
  ) {
    return this.binhluanService.update(+id, updateBinhluanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.binhluanService.remove(+id);
  }
}
