import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import path, { join } from 'path';
import handlebars from 'handlebars';
import { ValidationPipe } from '@nestjs/common';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifySecureSession from '@fastify/secure-session';
import fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'avatars.dzeninfra.ru'],
      },
    },
  });

  await app.register(fastifySecureSession, {
    // TODO хранить в др месте
    key: fs.readFileSync(
      path.join(__dirname, 'secrets', 'secure-session-secret-key'),
    ),
    sessionName: 'csrf-session',
    cookieName: 'csrf-session-cookie',
    cookie: {
      path: '/',
    },
  });

  await app.register(fastifyCsrf, {
    getToken: (req) => {
      const csrfToken = (req.query as { csrf?: string })?.csrf ?? '';
      return csrfToken;
    },
  });

  app.enableCors({
    origin: ['http://localhost:5173'], // vite frontend
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars,
    },
    templates: join(__dirname, '..', 'views'),
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
