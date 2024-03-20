import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { ImageController } from './image.controller';
import { PropertyService } from '../property/property.service';
import { PropertyRepository } from '../property/property.repository';

@Module({
  imports: [AuthModule],
  controllers: [ImageController],
  providers: [PropertyService, PropertyRepository],
})
export class ImageModule {}
