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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto, FileUploadPhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { PhongDto } from './dto/phong.dto';
import { Response } from 'express';
import { ApiBody, ApiConsumes, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/upload.service';

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

  @Get('/lay-theo-ma-vi-tri/:id')
  async findRoomByLocationID(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<PhongDto>> {
    try {
      const rooms = await this.phongService.findRoomByLocationID(+id);
      if (!rooms) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${id} not found` });
      }
      return res.status(HttpStatus.OK).json(rooms);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occured', error });
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

  @Post('/Upload-images/:id')
  @ApiConsumes('multipart/form-data') // define kiểu dữ liệu gửi lên trên swagger
  @ApiBody({
    type: FileUploadPhongDto,
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @UseInterceptors(
    FilesInterceptor('hinh_anh', 10, { storage: storage('room') }),
  )
  uploadImages(
    @Param('id') id: string,
    @UploadedFiles() file: Express.Multer.File[],
    @Res() res: Response,
  ): any {
    return res.status(HttpStatus.OK).json({ id, file });
  }
}
