import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnprocessableEntityError {
  @ApiProperty({
    description: 'The errors status.',
    example: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The errors validation errors.',
    example: [
      {
        property: 'name',
        errors: ['isNotEmpty'],
        constraints: {
          isNotEmpty: 'name should not be empty',
        },
      },
      {
        property: 'category',
        errors: ['isNotEmpty'],
        constraints: {
          isNotEmpty: 'category should not be empty',
        },
      },
    ],
  })
  error: [
    {
      property: string;
      errors: string[];
      constraints: {
        [type: string]: string;
      };
    },
  ];

  @ApiProperty({
    description: 'The time of the executed errors.',
    example: new Date(),
  })
  timestamp: Date;

  @ApiProperty({
    description: 'The REST path called.',
    example: '/users',
  })
  path: string;
}
