import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const userTokenId = this.getUserIdFromToken(token);
      req.body.userId = userTokenId;
    }

    next();
  }

  private getUserIdFromToken(token: string): number {
    const decodedToken = this.jwtService.decode(token);

    return decodedToken.sub;
  }
}
