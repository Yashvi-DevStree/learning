import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private channel;
  private connection;
  private readonly queue = 'notificationQueue';

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });

    console.log('Producer connected to RabbitMQ');
  }

  async sendNotification(data: any) {
    this.channel.sendToQueue(
      this.queue,
      Buffer.from(JSON.stringify(data)),
      { persistent: true },
    );

    console.log('Notification sent to queue');
  }
}
 