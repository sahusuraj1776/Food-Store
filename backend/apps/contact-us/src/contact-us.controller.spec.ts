import { Test, TestingModule } from '@nestjs/testing';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';

describe('ContactUsController', () => {
  let contactUsController: ContactUsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContactUsController],
      providers: [ContactUsService],
    }).compile();

    contactUsController = app.get<ContactUsController>(ContactUsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(contactUsController.getHello()).toBe('Hello World!');
    });
  });
});
