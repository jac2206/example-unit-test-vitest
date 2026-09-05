import { IPersonService, Person } from "./services/interfaces/person.interface";
import { ICalculatorService } from "./services/interfaces/calculator.interface";

import { container } from "./config/container";
import { IAuthService } from "./services/interfaces/auth.interface";
import { IShipmentService } from "./services/interfaces/shipment.interface";
import { IPurchaseDiscountService } from "./services/interfaces/purchase-discount.interface";
import { v4 as uuidv4 } from "uuid";

const person: Person = {
  name: "Julian",
  lastName: "Arango",
  age: 32,
};

const products = [
  { id: uuidv4(), name: "Product 1", price: 600000 },
  { id: uuidv4(), name: "Product 2", price: 500000 },
  { id: uuidv4(), name: "Product 3", price: 200000 },
];

const personService = container.resolve<IPersonService>("personService");
const calculatorService = container.resolve<ICalculatorService>("calculatorService");
const authService = container.resolve<IAuthService>("authService");
const shipmentService = container.resolve<IShipmentService>("shipmentService");
const purchaseDiscountService = container.resolve<IPurchaseDiscountService>(
  "purchaseDiscountService",
);

async function main() {
  const resultAdd = await calculatorService.add(5, 10);
  console.log("Result add:", resultAdd);
  const resultSubtract = await calculatorService.subtract(10, 5);
  console.log("Result subtract:", resultSubtract);
  const resultMultiply = await calculatorService.multiply(5, 10);
  console.log("Result multiply:", resultMultiply);
  const resultDivision = await calculatorService.divison(5, 5);
  console.log("Result multiply:", resultDivision);
  const resultPerson = await personService.createPerson(person);
  console.log("Person created:", resultPerson);
  const resultAuth = await authService.login("admin", "123");
  console.log("Auth result:", resultAuth);
  const resultShipment = await shipmentService.shipPackageCalculate({
    id: "Test",
    destination: "Los Angeles",
    weight: 10,
  });
  console.log("Shipment created:", resultShipment);
  const resultPurchaseDiscount =
    await purchaseDiscountService.calculateDiscount(products);
  console.log("Purchase discount created:", resultPurchaseDiscount);
}

main();
