import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyRepository } from './property.repository';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository],
  exports: [PropertyService],
})
export class PropertyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'property', method: RequestMethod.POST });
  }
}
