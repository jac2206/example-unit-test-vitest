import { UUIDTypes } from "uuid";
import { Products } from "../services/interfaces/purchase-discount.interface";

export class Order {
  constructor(
    public readonly id: UUIDTypes,
    public readonly products: Products[],
    public readonly total: number,
    public readonly discount: number,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      products: this.products,
      total: this.total,
      discount: this.discount,
    };
  }
}
