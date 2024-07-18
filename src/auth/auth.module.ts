import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'd367ec6ce788f25f51e3749cdd3925cfae17a67d28ccafcfd8f08eb9b3c21be4',
      signOptions: { expiresIn: '99999999h' },
    }),
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
