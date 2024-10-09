export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  weight: number;
  desc: string;
  compound: string[];
  calories: number;
  categoryId: number;
}
export interface ICategory {
  id: number;
  name: string;
  image: string;
}
