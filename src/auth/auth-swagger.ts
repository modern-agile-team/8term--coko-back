import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/users/dtos/response-user.dto';

export const ApiAuth = {
  verify: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: 'access 토큰 인증',
      }),
      ApiResponse({
        status: 200,
        description: `access 토큰 정보가 인증됨`,
        type: ResponseUserDto,
      }),
    );
  },
  newAccessToken: () => {
    return applyDecorators(
      ApiCookieAuth('refreshToken'),
      ApiOperation({
        summary: 'access 토큰 재발급',
      }),
      ApiResponse({
        status: 201,
        description: `access 토큰이 재발급 됨`,
      }),
    );
  },
  logout: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: '로그아웃',
      }),
      ApiResponse({
        status: 204,
        description: `로그아웃 성공`,
      }),
    );
  },
};
