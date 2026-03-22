import { Test, TestingModule } from '@nestjs/testing';
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';

describe('GmailController', () => {
  let gmailController: GmailController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GmailController],
      providers: [GmailService],
    }).compile();

    gmailController = app.get<GmailController>(GmailController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gmailController.getHello()).toBe('Hello World!');
    });
  });
});
