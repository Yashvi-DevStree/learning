import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'user-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Laptop Pro 15"' })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  @IsPositive()
  price: number;
}

export class OrderCreatedEvent {
  orderId: string;
  userId: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
}