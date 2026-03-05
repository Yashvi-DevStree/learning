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

    console.log('RabbitMQ connected');
  }

  async sendNotification(data: any) {
    this.channel.sendToQueue(
      this.queue,
      Buffer.from(JSON.stringify(data)),
      { persistent: true },
    );

    console.log('Notification sent to queue');
  }

  async consumeNotifications() {
    this.channel.consume(this.queue, (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        console.log('Processing notification:', content);

        this.channel.ack(msg);
      }
    });
  }
}
 