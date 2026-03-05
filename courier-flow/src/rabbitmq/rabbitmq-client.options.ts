import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { QUEUE_NAMES, RABBITMQ_SERVICE } from "./rabbitmq.constants";

export const rabbitmqClientOptions = (): ClientProviderOptions => ({
    name: RABBITMQ_SERVICE,
    transport: Transport.RMQ,
    options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
        queue: QUEUE_NAMES.ORDERS,
        queueOptions: {
            durable: true,
        },
        noAck: true,
        prefetchCount: 10,
    }
})
