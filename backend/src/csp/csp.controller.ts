import { Controller, Get, Render } from '@nestjs/common';

@Controller('csp')
export class CspController {
  @Get()
  @Render('index')
  getTemplate() {
    return { message: 'I AM FROM HBS' };
  }
}
