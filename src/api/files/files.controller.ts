import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto, GetAllDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Roles } from '../decarators/roles.decarator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @ApiOperation({ summary: 'Get all files' })
  @ApiResponse({ status: 200, description: 'List of files.', type: [CreateFileDto] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  @Get()
  findAll(@Body() getAllFileDto: GetAllDto) {
    return this.filesService.findAll(getAllFileDto);
  }

  @ApiOperation({ summary: 'Get a file by ID' })
  @ApiResponse({ status: 200, description: 'The file with the specified ID.', type: CreateFileDto })
  @ApiResponse({ status: 404, description: 'File not found.' })
  @ApiParam({ name: 'id', description: 'File ID' })
  @Get(':id')
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a file by ID' })
  @ApiResponse({ status: 200, description: 'The file has been successfully updated.', type: UpdateFileDto })
  @ApiResponse({ status: 404, description: 'File not found.' })
  @ApiParam({ name: 'id', description: 'File ID' })
  @Patch(':id')
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @ApiOperation({ summary: 'Delete a file by ID' })
  @ApiResponse({ status: 200, description: 'The file has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  @ApiParam({ name: 'id', description: 'File ID' })
  @Delete(':id')
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }

  @Get('download/:id')
  download(@Param('id') id: string, @Res() res: Response) {
    return this.filesService.download(id, res);
  }
}
