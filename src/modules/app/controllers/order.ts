import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Param } from '@nestjs/common';

import { IOrder } from '../../database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';
import { AuthRequired } from 'modules/common/guards/token';

@ApiTags('App: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderRepository: OrderRepository) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: Order })
  public async get(@Param('id') id: number) {
    return this.orderRepository.findById(id);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async create() {
    let order: IOrder = {};

    return this.orderRepository.insert(order);
  }
}
