import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatphongService } from './datphong.service';
import { CreateDatphongDto } from './dto/create-datphong.dto';
import { UpdateDatphongDto } from './dto/update-datphong.dto';

@Controller('datphong')
export class DatphongController {
  constructor(private readonly datphongService: DatphongService) {}

  @Post()
  create(@Body() createDatphongDto: CreateDatphongDto) {
    return this.datphongService.create(createDatphongDto);
  }

  @Get()
  findAll() {
    return this.datphongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datphongService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatphongDto: UpdateDatphongDto) {
    return this.datphongService.update(+id, updateDatphongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datphongService.remove(+id);
  }
}
