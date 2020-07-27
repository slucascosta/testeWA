import { Transaction, Page } from 'objection';
import { Injectable } from '@nestjs/common';

import { OrderItem } from 'modules/database/models/orderItem';
import { IOrderItem } from 'modules/database/interfaces/orderItem';
import { IPaginationParams } from 'modules/common/interfaces/pagination';

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

  public async list(orderId: number, params: IPaginationParams, transaction?: Transaction): Promise<Page<OrderItem>> {
    let query = OrderItem.query(transaction)
      .select('*')
      .page(params.page, params.pageSize)
      .where('orderId', '=', orderId);

    if (params.orderBy) query = query.orderBy(params.orderBy, params.orderDirection);

    if (params.term) {
      query = query.where(query => {
        return query
          .whereRaw(`cast(id as text) like '%${params.term}%'`)
          .orWhere('description', 'ilike', `%${params.term}%`)
          .orWhereRaw(`cast(quantity as text) like '%${params.term}%'`)
          .orWhereRaw(`cast(price as text) like '%${params.term}%'`);
      });
    }

    return query;
  }

  public async delete(id: number, transaction?: Transaction): Promise<number> {
    return OrderItem.query(transaction).deleteById(id);
  }
}
