import { IOrderItem } from '../interfaces/orderItem';
import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order';

export class OrderItem extends Model implements IOrderItem {
  @ApiProperty({ type: 'integer' })
  public id?: number;

  @ApiProperty({ type: 'string' })
  public description?: string;

  @ApiProperty({ type: 'integer' })
  public quantity?: number;

  @ApiProperty({ type: 'string', format: 'float' })
  public price?: number;

  public order: Order;

  public static get tableName(): string {
    return 'OrderItem';
  }

  public static get relationMappings(): any {
    return {
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        filter: (query: any) => query.select('id', 'createdDate', 'description', 'total'),
        join: {
          from: 'Order.id',
          to: 'OrderItem.orderId'
        }
      }
    };
  }
}
