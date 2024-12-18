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
import { VitriService } from './vitri.service';
import { CreateVitriDto } from './dto/create-vitri.dto';
import { UpdateVitriDto } from './dto/update-vitri.dto';
import { VitriDto } from './dto/vitri.dto';
import { Response } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('vitri')
export class VitriController {
  constructor(private readonly vitriService: VitriService) {}

  @Post()
  create(@Body() createVitriDto: CreateVitriDto) {
    return this.vitriService.create(createVitriDto);
  }

  @Get('/all-locations')
  async findAll(@Res() res: Response): Promise<Response<VitriDto[]>> {
    let locations = await this.vitriService.findAll();
    return res.status(HttpStatus.OK).json(locations);
  }

  @Get('/phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async findLocation(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<VitriDto[]>> {
    const formatPageIndex = pageIndex ? Number(pageIndex) : 1;
    const formatPageSize = pageSize ? Number(pageSize) : 10;
    let users = await this.vitriService.findLocation(
      formatPageIndex,
      formatPageSize,
      keyword,
    );
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/get-location-by-id/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<VitriDto>> {
    try {
      const location = await this.vitriService.findOne(+id);
      if (!location) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${id} not found` });
      }
      return res.status(HttpStatus.OK).json(location);
    } catch (error) {}
  }
  @Get('/search-by-name')
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async findByName(
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<VitriDto[]>> {
    try {
      let locations = await this.vitriService.findName(keyword);
      if (!locations) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${keyword} is not found` });
      }
      return res.status(HttpStatus.OK).json(locations);
    } catch (error) {
      throw new Error(error);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVitriDto: UpdateVitriDto) {
    return this.vitriService.update(+id, updateVitriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitriService.remove(+id);
  }
}
