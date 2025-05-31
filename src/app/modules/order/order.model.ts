import { model, Schema } from 'mongoose';
import { OrderStatus, TOrderData } from './order.interface';

const orderSchema = new Schema<TOrderData>(
  {
    paymentMethod: {
      type: String,
      enum: ['cash', 'stripe'],
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    transactionId: { type: String },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING, // Default value set to "pending"
    },
  },
  {
    timestamps: true,
  },
);
export const Order = model<TOrderData>('Order', orderSchema);
