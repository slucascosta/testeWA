import { PaginationValidator } from 'modules/common/validators/pagination';
import { IsString, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['id', 'createdDateFormated', 'description', 'total'])
  @ApiProperty({ required: false, enum: ['id', 'createdDateFormated', 'description', 'total'] })
  public orderBy: string;
}
