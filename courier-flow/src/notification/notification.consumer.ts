import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from '../rabbitmq/rabbitmq.constants';

export interface SendNotificationEvent {
  userId: string;
  title: string;
  message: string;
  orderId: string;
}

@Controller()
export class NotificationConsumer {
  @EventPattern(MESSAGE_PATTERNS.SEND_NOTIFICATION)
  async handleSendNotification(@Payload() notification: SendNotificationEvent) {
    try {
      console.log(`🔔 Push notification → Order [${notification.orderId}] created for user [${notification.userId}]`);
      await this.simulatePushNotification(notification.message);
    } catch (err) {
      console.error(`❌ Notification failed: ${err.message}`);
    }
  }

  private async simulatePushNotification(message: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    console.debug(` [PUSH] ${message}`);
  }
}