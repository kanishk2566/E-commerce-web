export interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;  
  rating: {
    rate: number;
    count: number;
  }
}
