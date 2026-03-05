import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
 await app.listen(3001); 
  console.log('Worker is running on port 3001');
}
bootstrap();
