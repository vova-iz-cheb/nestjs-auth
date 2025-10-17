import { Body, Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  type FastifyReply,
  type FastifyRequest,
  FastifyInstance,
} from 'fastify';
import { Public } from '../common/decorators/public.decorator';

@Controller('csrf')
export class CsrfController {
  private fastifyInstance: FastifyInstance;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  onModuleInit() {
    this.fastifyInstance = this.httpAdapterHost.httpAdapter.getInstance();

    this.fastifyInstance.addHook('onRequest', (req, reply, done) => {
      if (req.url?.startsWith('/csrf/submit') && req.method === 'POST') {
        this.fastifyInstance.csrfProtection(req, reply, done);
      } else {
        done();
      }
    });
  }

  @Public()
  @Header('Content-Type', 'text/html')
  @Get()
  getForm(
    @Res({ passthrough: true })
    response: FastifyReply & { generateCsrf: () => string },
  ) {
    const token = response.generateCsrf(); // Fastify CSRF
    console.log('csrf token', token);

    return `
      <h1>CSRF Example</h1>
      <form method="POST" action="/csrf/submit?csrf=${token}">
        <input type="hidden" name="_csrf" value="${token}" />
        <input type="text" name="name" placeholder="Enter your name" />
        <button type="submit">Submit</button>
      </form>
    `;
  }

  @Public()
  @Post('submit')
  submit(@Body() body: { _csrf?: string }) {
    console.log('submit body', body);
    const token = body._csrf;
    console.log('submit token', token);
    return {
      message: 'CSRF passed',
    };
  }
}
