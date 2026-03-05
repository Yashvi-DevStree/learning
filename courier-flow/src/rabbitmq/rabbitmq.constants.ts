export const RABBITMQ_SERVICE = 'RABBITMQ_SERVICE';

export const QUEUE_NAMES = {
  ORDERS: 'orders_queue',
  MAIL: 'mail_queue',
  NOTIFICATIONS: 'notifications_queue',
} as const;

export const MESSAGE_PATTERNS = {
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  SEND_MAIL: 'mail.send',
  SEND_NOTIFICATION: 'notification.send',
} as const;