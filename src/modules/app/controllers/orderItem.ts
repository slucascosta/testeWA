import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Param, Get, Post, Body } from '@nestjs/common';

import { OrderItemRepository } from '../repositories/orderItem';
import { OrderItem } from 'modules/database/models/orderItem';
import { CreateValidator } from '../validators/orderItem/create';

@ApiTags('App: Order Item')
@Controller('/order/:orderId/item')
export class OrderItemController {
  constructor(private orderItemRepository: OrderItemRepository) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: OrderItem })
  public async get(@Param('id') id: number) {
    return this.orderItemRepository.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: OrderItem, isArray: true })
  public async getByOrder(@Param('orderId') orderId: number) {
    return this.orderItemRepository.findByOrderId(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: OrderItem })
  public async create(@Body() model: CreateValidator, @Param('orderId') orderId: number) {
    model.orderId = orderId;

    return this.orderItemRepository.insert(model);
  }
}
