import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './auth.service';
import { LoginController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { UserRepository } from '../user/user.repository';
import { RoleGuard } from './role.guard';
import { PermissionGuard } from './permission.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secrets,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    AuthGuard,
    UserRepository,
    RoleGuard,
    PermissionGuard,
  ],
})
export class AuthModule {}
