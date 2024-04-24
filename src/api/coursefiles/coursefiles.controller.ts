import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoursefilesService } from './coursefiles.service';
import { CreateCoursefileDto } from './dto/create-coursefile.dto';
import { UpdateCoursefileDto } from './dto/update-coursefile.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('CourseFiles')
@ApiBearerAuth()
@Controller('coursefiles')
@UseGuards(AdminGuard)
export class CoursefilesController {
  constructor(private readonly coursefilesService: CoursefilesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new course file' })
  @ApiResponse({
    status: 201,
    description: 'Course file created successfully',
    type: CreateCoursefileDto,
  })
  create(@Body() createCoursefileDto: CreateCoursefileDto) {
    return this.coursefilesService.create(createCoursefileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all course files' })
  @ApiResponse({
    status: 200,
    description: 'Return all course files.',
    type: [CreateCoursefileDto],
  })
  findAll() {
    return this.coursefilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course file by ID' })
  @ApiParam({ name: 'id', description: 'Course file ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the course file by ID.',
    type: CreateCoursefileDto,
  })
  @ApiResponse({ status: 404, description: 'Course file not found' })
  findOne(@Param('id') id: string) {
    return this.coursefilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a course file by ID' })
  @ApiParam({ name: 'id', description: 'Course file ID' })
  @ApiResponse({ status: 200, description: 'Course file updated successfully' })
  @ApiResponse({ status: 404, description: 'Course file not found' })
  update(@Param('id') id: string, @Body() updateCoursefileDto: UpdateCoursefileDto) {
    return this.coursefilesService.update(id, updateCoursefileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course file by ID' })
  @ApiParam({ name: 'id', description: 'Course file ID' })
  @ApiResponse({ status: 200, description: 'Course file deleted successfully' })
  @ApiResponse({ status: 404, description: 'Course file not found' })
  remove(@Param('id') id: string) {
    return this.coursefilesService.remove(id);
  }
}
