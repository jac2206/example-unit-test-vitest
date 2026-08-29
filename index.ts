//   let person = {
//     name: "Julian",
//     lastName: "Arango",
//     age: 32
//   }

// export const personObject = async (person: any) => {
//   console.log("person is: ", person)
//   return person;
// }

// personObject(person);

import {
  IPersonService,
  Person
} from "./src/services/interfaces/person.interface";
import { ICalculatorService } from "./src/services/interfaces/calculator.interface";
// import { PersonService } from "./src/services/person.service";
// import { CalculatorService } from "./src/services/calculator.service";
import { container } from "./src/config/container";

const person: Person = {
  name: "Julian",
  lastName: "Arango",
  age: 32
};

// const personService: IPersonService = new PersonService();
// const calculatorService: ICalculatorService = new CalculatorService();

// personService.createPerson(person)
//   .then((result) => {
//     console.log("Person created:", result);
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });

const personService = container.resolve<IPersonService>("personService");
const calculatorService = container.resolve<ICalculatorService>("calculatorService");

async function main() {
  const resultAdd = await calculatorService.add(5, 10);
  console.log("Result add:", resultAdd);
  const resultSubtract = await calculatorService.subtract(10, 5);
  console.log("Result subtract:", resultSubtract);
  const resultMultiply = await calculatorService.multiply(5, 10);
  console.log("Result multiply:", resultMultiply);
}

main();