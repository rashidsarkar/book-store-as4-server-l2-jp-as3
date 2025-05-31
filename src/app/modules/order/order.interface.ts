/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRM = 'confirm',
  CANCEL = 'cancel',
  DELIVERED = 'delivered',
}

export interface TOrderData {
  product: Types.ObjectId;
  quantity: number;
  userId: Types.ObjectId;
  paymentMethod: 'cash' | 'stripe';
  totalPrice: number;
  transactionId?: string;
  status?: OrderStatus;
  _id?: string;
}
