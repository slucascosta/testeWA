import { Transaction } from 'objection';
import { Injectable } from '@nestjs/common';

import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

@Injectable()
export class OrderRepository {
  public async findById(id: number, transaction?: Transaction) {
    return Order.query(transaction).findById(id);
  }

  public async insert(model: IOrder, transaction?: Transaction) {
    return Order.query(transaction).insert(model);
  }
}
