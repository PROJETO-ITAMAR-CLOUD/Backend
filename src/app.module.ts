import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PropertyModule } from './modules/property/property.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from './modules/images/image.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PropertyModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
