import { Injectable } from '@nestjs/common';
import { Transaction } from 'objection';
import { OrderItem } from 'modules/database/models/orderItem';
import { IOrderItem } from 'modules/database/interfaces/orderItem';

@Injectable()
export class OrderItemRepository {
  public async findById(id: number, transaction?: Transaction) {
    return OrderItem.query(transaction).findById(id);
  }

  public async findByOrderId(orderId: number, transaction?: Transaction) {
    return OrderItem.query(transaction).where('orderId', '=', orderId);
  }

  public async insert(model: IOrderItem, transaction?: Transaction) {
    return OrderItem.query(transaction).insert(model);
  }
}
