import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Param, Body } from '@nestjs/common';

import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';
import { CreateValidator } from '../validators/order/create';

@ApiTags('App: Order')
@Controller('/order')
export class OrderController {
  constructor(private orderRepository: OrderRepository) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: Order })
  public async get(@Param('id') id: number) {
    return this.orderRepository.findById(id);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async create(@Body() model: CreateValidator) {
    return this.orderRepository.insert(model);
  }
}
