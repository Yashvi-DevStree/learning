import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Patch(':id/status/:status')
  updateOrder(@Param('id') id: string, @Param('status') status: string) {
    return this.ordersService.updateOrder(id, status);
  }
}