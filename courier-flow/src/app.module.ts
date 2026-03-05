import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [OrdersModule, MailModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
