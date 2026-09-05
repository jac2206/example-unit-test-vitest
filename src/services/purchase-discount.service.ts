import { Order } from "../entities/order.entity";
import {
  IPurchaseDiscountService,
  Products,
  PurchaseDiscount,
} from "./interfaces/purchase-discount.interface";
import { v4 as uuidv4 } from "uuid";

export class PurchaseDiscountService implements IPurchaseDiscountService {
  constructor() {}

  async calculateDiscount(products: Products[]): Promise<PurchaseDiscount> {
    await this.validateProducts(products);
    const total = products.reduce((acc, product) => acc + product.price, 0);
    const discount = await this.calculateDiscountWithRules(total);
    const purchase: PurchaseDiscount = {
      id: uuidv4(),
      discount,
      total,
      products,
    } as PurchaseDiscount;
    await this.GenerateOrder(purchase);
    return purchase;
  }

  private async calculateDiscountWithRules(total: number): Promise<number> {
    if (total > 500000 && total <= 1000000) {
      return total * 0.1; // 10% discount
    }
    if (total > 1000000) {
      return total * 0.15; // 15% discount
    }
    return 0;
  }

  private async validateProducts(products: Products[]): Promise<void> {
    if (!products || products.length === 0) {
      throw new Error("Products array cannot be empty");
    }
  }

  private async GenerateOrder(purchase: PurchaseDiscount): Promise<void> {
    new Order(uuidv4(), purchase.products, purchase.total, purchase.discount);
  }
}
