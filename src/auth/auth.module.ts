import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersModule } from '../users/users.module';
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '99999999h' },
    }),
  ],
  providers: [AuthService, AuthGuard, JwtStrategy],
  exports: [AuthService, JwtModule, AuthGuard],
})
export class AuthModule {}