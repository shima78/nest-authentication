import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    description: 'Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2Y5ZTJlYTE0NTYyYTI0YmE5MmM3NiIsImlhdCI6MTY5MTM1ODgzNCwiZXhwIjoxNjkxNjE4MDM0fQ.LZXKplxVYHSpgRHe-q9_sqV2oTM11BAAHYaQaxzk-ZE',
  })
  readonly token: string;
}
