import { PartialType } from '@nestjs/swagger';
import { CreateDatphongDto } from './create-datphong.dto';

export class UpdateDatphongDto extends PartialType(CreateDatphongDto) {}
