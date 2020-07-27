import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';
import { OrderItem } from './orderItem';
import { dateFormat } from 'helpers/date';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id?: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;

  @ApiProperty({ type: 'string' })
  public get createdDateFormated(): string {
    return this.createdDate && dateFormat(this.createdDate, 'dd/MM/yyyy HH:mm');
  }

  @ApiProperty({ type: 'integer' })
  public total: number;

  @ApiProperty({ type: 'string' })
  public description: string;

  public items?: OrderItem[];

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'Order.id',
          to: 'OrderItem.orderId'
        }
      }
    };
  }

  public static get virtualAttributes(): string[] {
    return ['createdDateFormated'];
  }
}
