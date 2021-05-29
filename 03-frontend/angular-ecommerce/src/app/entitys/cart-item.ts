import { Product } from './product';
export class CartItem{
  id: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(prodcut:Product) {
    this.id = prodcut.id;
    this.name = prodcut.name;
    this.imageUrl = prodcut.imageUrl;
    this.unitPrice = prodcut.unitPrice;
    this.quantity = 1;
  }
}