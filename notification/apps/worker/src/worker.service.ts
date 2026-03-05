import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class WorkerService implements OnModuleInit {
  private readonly queue = 'notificationQueue';

  async onModuleInit() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(this.queue, { durable: true});
      await channel.prefetch(1);
      console.log('📟 [Worker App] Waiting for messages...');

      channel.consume(this.queue, async (msg) => {
        if (msg){
          const content = msg.content.toString();
          console.log(`📩 [Worker App] Received message: ${content}`);
          channel.ack(msg);
        }
      })
    } catch (error) {
      console.error('Error connecting to RabbitMQ', error);
    }
  }
}
