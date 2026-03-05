import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitmqClientOptions } from 'src/rabbitmq/rabbitmq-client.options';
import { OrdersConsumer } from './orders.consumer';

@Module({
  imports: [ClientsModule.register([rabbitmqClientOptions()])],
  providers: [OrdersService],
  controllers: [OrdersController, OrdersConsumer],
})
export class OrdersModule {}
