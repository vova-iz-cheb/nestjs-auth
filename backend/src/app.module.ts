import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CspModule } from './csp/csp.module';

@Module({
  imports: [CspModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
