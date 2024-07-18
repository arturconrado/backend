import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log('Token recebido:', token);

    if (!token) {
      console.log('Token não encontrado');
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Payload verificado:', payload);
      request.user = payload;
    } catch (error: any) {
      console.log('Erro na verificação do token:', error.message);
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = (request.headers.authorization || '').split(' ');
    return type === 'Bearer' ? token : null;
  }
}
