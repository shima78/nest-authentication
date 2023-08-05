import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundError {
  @ApiProperty({
    description: 'The errors status.',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The errors message.',
    example: 'The filter {Restaurant} has not be found.',
  })
  message: string;

  @ApiProperty({
    description: 'The time of the executed errors.',
    example: new Date(),
  })
  timestamp: Date;

  @ApiProperty({
    description: 'The REST path called.',
    example: '/filter/create',
  })
  path: string;
}
