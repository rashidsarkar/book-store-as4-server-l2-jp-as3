export type BookCategory =
  | 'Romance'
  | 'Science Fiction'
  | 'Mystery'
  | 'Non-Fiction'
  | 'Biography';

export type TBook = {
  name: string;
  image: string;
  price: number;
  quantity: number;
  author: string;
  publicationYear: number;
  category: BookCategory;
  description: string;
};
