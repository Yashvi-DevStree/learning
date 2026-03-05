import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERNS, RABBITMQ_SERVICE } from 'src/rabbitmq/rabbitmq.constants';
import { OrderCreatedEvent } from './order.dto';

@Controller()
export class OrdersConsumer {

  constructor(
    @Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy,
  ) {}

  @EventPattern(MESSAGE_PATTERNS.ORDER_CREATED)
  async handleOrderCreated(@Payload() order: OrderCreatedEvent) {
    console.log(`📥 order.created received → [${order.orderId}]`);

    this.client.emit(MESSAGE_PATTERNS.SEND_MAIL, {
      to: `${order.userId}@example.com`,
      subject: `Order Confirmed: ${order.product}`,
      body: `Your order for ${order.product} ($${order.total}) has been placed!`,
      orderId: order.orderId,
    });

    this.client.emit(MESSAGE_PATTERNS.SEND_NOTIFICATION, {
      userId: order.userId,
      title: 'Order Placed 🎉',
      message: `Your order for ${order.product} is confirmed!`,
      orderId: order.orderId,
    });
  }
}