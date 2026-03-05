import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from '../rabbitmq/rabbitmq.constants';

export interface SendMailEvent {
  to: string;
  subject: string;
  body: string;
  orderId: string;
}  

@Controller()
export class MailConsumer {
  @EventPattern(MESSAGE_PATTERNS.SEND_MAIL)
  async handleSendMail(@Payload() mail: SendMailEvent) {
    try {
      console.log(`📧 Sending email to user [${mail.to}]`);
      console.log(`   Subject: ${mail.subject}`);
      console.log(`   Body: ${mail.body}`);

      await this.simulateSendEmail(mail);

      console.log(`✅ Email sent for order [${mail.orderId}]`);
    } catch (err) {
      console.error(`❌ Failed to send email: ${err.message}`);
    }
  }

  private async simulateSendEmail(mail: SendMailEvent): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.debug(`[MAIL] To: ${mail.to} | Subject: ${mail.subject}`);
  }
}