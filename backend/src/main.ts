import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { join } from 'path';
import handlebars from 'handlebars';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
