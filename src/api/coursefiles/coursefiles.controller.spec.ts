import { Test, TestingModule } from '@nestjs/testing';
import { CoursefilesController } from './coursefiles.controller';
import { CoursefilesService } from './coursefiles.service';

describe('CoursefilesController', () => {
  let controller: CoursefilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursefilesController],
      providers: [CoursefilesService],
    }).compile();

    controller = module.get<CoursefilesController>(CoursefilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
