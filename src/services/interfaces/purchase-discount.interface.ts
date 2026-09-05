import { UUIDTypes } from "uuid";

export interface Products {
  id: UUIDTypes;
  name: string;
  price: number;
}

export interface PurchaseDiscount {
  id: UUIDTypes;
  discount: number;
  total: number;
  products: Products[];
}

export interface IPurchaseDiscountService {
  calculateDiscount(products: Products[]): Promise<PurchaseDiscount>;
}
