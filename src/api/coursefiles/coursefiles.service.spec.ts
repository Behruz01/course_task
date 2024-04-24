import { Test, TestingModule } from '@nestjs/testing';
import { CoursefilesService } from './coursefiles.service';

describe('CoursefilesService', () => {
  let service: CoursefilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursefilesService],
    }).compile();

    service = module.get<CoursefilesService>(CoursefilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
