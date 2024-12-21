import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Headers,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FileUploadAvatarDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request, Response } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/upload.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all-users')
  async findAllUser(@Res() res: Response): Promise<Response<UserDto[]>> {
    let users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response<UserDto>> {
    let newUser = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @Get('/phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async findUser(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<UserDto[]>> {
    const formatPageIndex = pageIndex ? Number(pageIndex) : 1;
    const formatPageSize = pageSize ? Number(pageSize) : 10;
    let users = await this.userService.findUser(
      formatPageIndex,
      formatPageSize,
      keyword,
    );
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<UserDto>> {
    try {
      const user = await this.userService.findOne(+id);
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${id} not found` });
      }
      return res.status(HttpStatus.OK).json(user);
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
  ): Promise<Response<UserDto[]>> {
    try {
      let users = await this.userService.findName(keyword);
      if (!users || users.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `${keyword} is not found` });
      }
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error('Error occurred in findName controller:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while searching for users.',
        error: error.message || 'Unknown error',
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/upload-image-avatar/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadAvatarDto,
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @UseInterceptors(FileInterceptor('hinhAnh', { storage: storage('user') }))
  uploadThumbnail(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): any {
    return res.status(HttpStatus.OK).json({ id, file });
  }
}
