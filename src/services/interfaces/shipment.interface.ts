export interface Package {
  id: string;
  weight: number;
  destination: string;
}

export interface IShipmentService {
  shipPackageCalculate(pkg: Package): Promise<number>;
}
