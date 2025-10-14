import { Test, TestingModule } from '@nestjs/testing';
import { CspController } from './csp.controller';

describe('CspController', () => {
  let controller: CspController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CspController],
    }).compile();

    controller = module.get<CspController>(CspController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
