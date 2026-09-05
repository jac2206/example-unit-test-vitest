import { IShipmentService, Package } from "./interfaces/shipment.interface";

export class ShipmentService implements IShipmentService {
  constructor() {}

  async shipPackageCalculate(pkg: Package): Promise<number> {
    const cost = await this.calculateWithWeight(pkg.weight);
    return cost;
  }

  private async calculateWithWeight(weight: number): Promise<number> {
    if (weight <= 0) {
      throw new Error("Weight must be greater than 0");
    }
    if (weight <= 5) {
      return 10000;
    }
    if (weight > 5 && weight <= 20) {
      return 20000;
    }
    return 50000;
  }
}
