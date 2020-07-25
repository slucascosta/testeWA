import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';
import { OrderItem } from './orderItem';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id?: number;

  @ApiProperty({ type: 'date-time' })
  public createdDate: Date;

  @ApiProperty({ type: 'integer' })
  public total: number;

  @ApiProperty({ nullable: true })
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
}
