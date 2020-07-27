import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Param, Body, Query, Delete } from '@nestjs/common';

import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';
import { OrderCreateValidator } from '../validators/order/create';
import { OrderListValidator } from '../validators/order/list';

@ApiTags('App: Order')
@Controller('/order')
export class OrderController {
  constructor(private orderRepository: OrderRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: OrderListValidator) {
    return this.orderRepository.list(model);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Order })
  public async get(@Param('id') id: number) {
    return this.orderRepository.findById(id);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async create(@Body() model: OrderCreateValidator) {
    return this.orderRepository.insert(model);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.orderRepository.delete(id);
  }
}
