import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../decarators/roles.decarator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('myinfo')
  @ApiOperation({ summary: 'Get information about the user' })
  @ApiResponse({ status: 200, description: 'Returns user information' })
  myInfo(@Req() req: Request) {
    return this.usersService.myInfo(req);
  }

  @Get()
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(["admin", "superAdmin"])
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Returns the user by ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
