import { Body, Controller, Get, Post } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Post('send')
  async send(@Body() data: any) {
    // We send the data to RabbitMQ
    await this.rabbitmqService.sendNotification(data);
    
    return {
      status: 'Success',
      message: 'Notification handed off to RabbitMQ',
      data: data
    };
  }

}
