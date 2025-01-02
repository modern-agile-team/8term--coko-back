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
import { AccessTokenStrategy, RefreshTokenStrategy } from './jwt/jwt.startegy';

@Module({
  imports: [PassportModule, JwtModule, RedisModule, UsersModule],
  providers: [
    AuthService,
    TokenService,
    CookieService,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
