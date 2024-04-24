import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsercoursesService } from './usercourses.service';
import { CreateUsercourseDto } from './dto/create-usercourse.dto';
import { forUser } from '../users/users.service';
import { Roles } from '../decarators/roles.decarator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('usercourses')
@ApiBearerAuth()
@Controller('usercourses')
export class UsercoursesController {
  constructor(private readonly usercoursesService: UsercoursesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user course' })
  @ApiResponse({ status: 201, description: 'User course created successfully' })
  create(@Body() createUsercourseDto: CreateUsercourseDto, @Req() req: forUser) {
    return this.usercoursesService.create(createUsercourseDto, req);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user courses' })
  @ApiResponse({ status: 200, description: 'Returns all user courses' })
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  findAll() {
    return this.usercoursesService.findAll();
  }

  @Get('mycourses')
  @ApiOperation({ summary: 'Get the current user\'s courses' })
  @ApiResponse({ status: 200, description: 'Returns the current user\'s courses' })
  mycourses(@Req() req: forUser) {
    return this.usercoursesService.mycourses(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user course by ID' })
  @ApiParam({ name: 'id', description: 'User course ID' })
  @ApiResponse({ status: 200, description: 'Returns the user course by ID' })
  findOne(@Param('id') id: string, @Req() req: forUser) {
    return this.usercoursesService.findOne(id, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user course by ID' })
  @ApiParam({ name: 'id', description: 'User course ID' })
  @ApiResponse({ status: 200, description: 'User course deleted successfully' })
  remove(@Param('id') id: string, @Req() req: forUser) {
    return this.usercoursesService.remove(id, req);
  }
}
