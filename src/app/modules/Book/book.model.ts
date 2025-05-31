import { model, Schema } from 'mongoose';
import { TBook } from './book.interface';

const bookSchema = new Schema<TBook>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Romance',
        'Science Fiction',
        'Mystery',
        'Non-Fiction',
        'Biography',
      ], // Enforcing category validation
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Book = model<TBook>('Book', bookSchema);
