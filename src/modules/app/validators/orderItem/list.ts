import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class OrderItemListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['id', 'description', 'quantity', 'price'])
  @ApiProperty({ required: false, enum: ['id', 'description', 'quantity', 'price'] })
  public orderBy: string;
}
