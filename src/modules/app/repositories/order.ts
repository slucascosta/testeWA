import { Transaction, Page } from 'objection';
import { Injectable } from '@nestjs/common';

import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { OrderItem } from 'modules/database/models/orderItem';

@Injectable()
export class OrderRepository {
  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).findById(id);
  }

  public async insert(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(model);
  }

  public async delete(id: number, transaction?: Transaction): Promise<number> {
    return Order.query(transaction).deleteById(id);
  }

  public async getTotal(id: number, transaction?: Transaction) {
    return OrderItem.query(transaction)
      .where('orderId', '=', id)
      .sum('price')
      .first();
  }

  public async updateTotal(orderId: number) {
    return this.findById(orderId).then(order => {
      this.getTotal(order.id)
        .then((item: any) => item['sum'] as number)
        .then(total => {
          order.total = total;
          return this.update(order);
        });
    });
  }

  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, model as any);
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy == 'createdDateFormated') params.orderBy = 'createdDate';
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if (params.term) {
      query = query.where(query => {
        return query
          .whereRaw(`cast(id as text) like '%${params.term}%'`)
          .orWhere('description', 'ilike', `%${params.term}%`)
          .orWhereRaw(`cast(total as text) like '%${params.term}%'`)
          .orWhereRaw(`to_char("createdDate", 'dd/mm/yyyy hh24:mi') like '%${params.term}%'`);
      });
    }

    return query;
  }
}
