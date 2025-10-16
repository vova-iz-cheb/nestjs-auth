import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from '../decorators/public.decorator';
import { type FastifyRequest } from 'fastify';
import { jwtConstants } from '../../auth/constants';
import { JwtPayload } from '../../auth/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('==isPublic==', isPublic);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const authHeader = request.headers.authorization || '';
    console.log('==authHeader==', authHeader);

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    console.log('==token==', token);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstants.secret,
      });
      console.log('==payload==', payload);

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
