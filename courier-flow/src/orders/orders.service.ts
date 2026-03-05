import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MESSAGE_PATTERNS,
  RABBITMQ_SERVICE,
} from 'src/rabbitmq/rabbitmq.constants';
import { CreateOrderDto, OrderCreatedEvent } from './order.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy) {}

  async createOrder(dto: CreateOrderDto) {
    const order: OrderCreatedEvent = {
      orderId: randomUUID(),
      userId: dto.userId,
      product: dto.product,
      quantity: dto.quantity,
      price: dto.price,
      total: dto.quantity * dto.price,
      createdAt: new Date().toISOString(),
    };

    console.log(`Publishing order [${order.orderId}] to RabbitMQ...`);

    // emit() - fire-and-forget (no response expected), send() - request-response
    this.client.emit(MESSAGE_PATTERNS.ORDER_CREATED, order);

    return { message: 'Order queued successfully', order };
  }

  async updateOrder(orderId: string, status: string) {
    const event = { orderId, status, updatedAt: new Date().toISOString() };

    console.log(`Publishing order update [${orderId}] → status: ${status}`);
    this.client.emit(MESSAGE_PATTERNS.ORDER_UPDATED, event);
    return { message: 'Order update queued successfully', event };
  }
}
