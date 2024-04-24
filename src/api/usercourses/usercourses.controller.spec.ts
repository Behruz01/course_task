import { Test, TestingModule } from '@nestjs/testing';
import { UsercoursesController } from './usercourses.controller';
import { UsercoursesService } from './usercourses.service';

describe('UsercoursesController', () => {
  let controller: UsercoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsercoursesController],
      providers: [UsercoursesService],
    }).compile();

    controller = module.get<UsercoursesController>(UsercoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
