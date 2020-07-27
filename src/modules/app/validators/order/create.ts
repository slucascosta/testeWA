import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

import { IOrder } from 'modules/database/interfaces/order';

export class OrderCreateValidator implements IOrder {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @ApiProperty({ required: true, type: 'string', maxLength: 64 })
  public description: string;
}
