import {} from "awilix";

import { asClass, createContainer, InjectionMode } from "awilix";
import { PersonService } from "../services/person.service";
import { CalculatorService } from "../services/calculator.service";
import { AuthService } from "../services/auth.service";
import { ShipmentService } from "../services/shipment.service";
import { PurchaseDiscountService } from "../services/purchase-discount.service";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  personService: asClass(PersonService).singleton(),
  calculatorService: asClass(CalculatorService).singleton(),
  authService: asClass(AuthService).singleton(),
  shipmentService: asClass(ShipmentService).singleton(),
  purchaseDiscountService: asClass(PurchaseDiscountService).singleton(),
});
