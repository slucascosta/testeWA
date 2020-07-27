import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Param, Get, Post, Body, Query, Delete } from '@nestjs/common';

import { OrderItemRepository } from '../repositories/orderItem';
import { OrderItem } from 'modules/database/models/orderItem';
import { OrderItemCreateValidator } from '../validators/orderItem/create';
import { OrderItemListValidator } from '../validators/orderItem/list';
import { OrderRepository } from '../repositories/order';

@ApiTags('App: Order Item')
@Controller('/order/:orderId/item')
export class OrderItemController {
  constructor(private orderItemRepository: OrderItemRepository, private orderRepository: OrderRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [OrderItem] })
  public async list(@Query() model: OrderItemListValidator, @Param('orderId') orderId: number) {
    return this.orderItemRepository.list(orderId, model);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: OrderItem })
  public async get(@Param('id') id: number) {
    return this.orderItemRepository.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [OrderItem] })
  public async getByOrder(@Param('orderId') orderId: number) {
    return this.orderItemRepository.findByOrderId(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: OrderItem })
  public async create(@Body() model: OrderItemCreateValidator, @Param('orderId') orderId: number) {
    return this.orderItemRepository.insert(model).then(async item => {
      await this.orderRepository.updateTotal(orderId);
      return item;
    });
  }

  @Delete(':id')
  public async delete(@Param('id') id: number, @Param('orderId') orderId: number) {
    return this.orderItemRepository.delete(id).then(async item => {
      await this.orderRepository.updateTotal(orderId);
      return item;
    });
  }
}
