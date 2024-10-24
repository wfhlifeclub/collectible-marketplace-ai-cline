export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  condition: Condition;
  seller: string;
  rating: number;
  bids: number;
  timeLeft: string;
}

export type Condition = 'New' | 'Used' | 'Refurbished';

export interface PriceRange {
  min: number;
  max: number | null;
  label: string;
}