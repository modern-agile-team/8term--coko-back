import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UsersModule } from 'src/users/modules/users.module';
import { RedisModule } from './redis/redis.module';
import { CookieService } from './services/cookie.service';
import {
  AccessTokenStrategy,
  AdminAccessTokenStrategy,
  RefreshTokenStrategy,
} from './jwt/jwt.startegy';
import { AdminGuard } from './guard/admin.guard';

@Module({
  imports: [PassportModule, JwtModule, RedisModule, UsersModule],
  providers: [
    AuthService,
    TokenService,
    CookieService,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AdminAccessTokenStrategy,
    AdminGuard,
  ],
  controllers: [AuthController],
  exports: [TokenService, CookieService],
})
export class AuthModule {}
