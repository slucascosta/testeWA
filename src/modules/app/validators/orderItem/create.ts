import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, Min, IsInt } from 'class-validator';

import { IOrderItem } from 'modules/database/interfaces/orderItem';

export class CreateValidator implements IOrderItem {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  public orderId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty({ required: true, type: 'string', maxLength: 128 })
  public description: string;

  @IsNotEmpty()
  @Min(0.01)
  @ApiProperty({ required: true, type: 'float', minimum: 0.01 })
  public price: number;

  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer', minimum: 1 })
  public quantity: number;
}
