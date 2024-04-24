import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto, GetAllFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Roles } from '../decarators/roles.decarator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  findAll(@Body() getAllFileDto: GetAllFileDto) {
    return this.filesService.findAll(getAllFileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
