import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiAdmins = {
  loginAdmin: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'admin 정보 인증',
      }),
      ApiResponse({
        status: 200,
        description: `admin 정보가 인증됨`,
      }),
    );
  },
  verifyAdmin: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'admin 토큰 인증',
      }),
      ApiResponse({
        status: 200,
        description: `admin 토큰이 인증됨`,
      }),
    );
  },
};
