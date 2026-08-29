import {} from "awilix";

import { asClass, createContainer, InjectionMode } from 'awilix';
import { PersonService } from "../services/person.service";
import { CalculatorService } from "../services/calculator.service";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
    personService: asClass(PersonService).singleton(),
    calculatorService: asClass(CalculatorService).singleton()

});
