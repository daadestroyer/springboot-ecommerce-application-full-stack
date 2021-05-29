import { Product } from './product';
export class CartItem{
  id: string;
  sku: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  description: string;
  

  constructor(prodcut:Product) {
    this.id = prodcut.id;
    this.sku = prodcut.sku;
    this.name = prodcut.name;
    this.imageUrl = prodcut.imageUrl;
    this.unitPrice = prodcut.unitPrice;
    this.description = prodcut.description;
    this.quantity = 1;
  }
}