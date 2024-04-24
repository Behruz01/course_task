import { Test, TestingModule } from '@nestjs/testing';
import { UsercoursesService } from './usercourses.service';

describe('UsercoursesService', () => {
  let service: UsercoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsercoursesService],
    }).compile();

    service = module.get<UsercoursesService>(UsercoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
