import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { QUEUE_NAMES } from './rabbitmq/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: QUEUE_NAMES.ORDERS,
      queueOptions: { durable: true },
      noAck: true, // auto acknowledgment (simpler for local dev)
    },
  });


  await app.startAllMicroservices();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\n🚀 HTTP server  → http://localhost:${port}`);
  console.log(`🐇 RabbitMQ UI  → http://localhost:15672  (guest / guest)\n`);
}

bootstrap();
