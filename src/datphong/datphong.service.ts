import { Injectable } from '@nestjs/common';
import { CreateDatphongDto } from './dto/create-datphong.dto';
import { UpdateDatphongDto } from './dto/update-datphong.dto';

@Injectable()
export class DatphongService {
  create(createDatphongDto: CreateDatphongDto) {
    return 'This action adds a new datphong';
  }

  findAll() {
    return `This action returns all datphong`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datphong`;
  }

  update(id: number, updateDatphongDto: UpdateDatphongDto) {
    return `This action updates a #${id} datphong`;
  }

  remove(id: number) {
    return `This action removes a #${id} datphong`;
  }
}
