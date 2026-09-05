import { IPersonService, Person } from "./interfaces/person.interface";
import { FullPerson } from "../entities/person.entity";

export class PersonService implements IPersonService {
  constructor() {}

  async createPerson(person: Person): Promise<FullPerson> {
    await this.validateName(person);
    await this.validateAge(person.age);

    // const fullPerson = {
    //     ...person,
    //     fullName: person.name + " " + person.lastName
    // } as FullPerson;

    const fullPerson: FullPerson = {
      ...person,
      fullName: person.name + " " + person.lastName,
    } as FullPerson;

    // const fullPerson: FullPerson = new FullPerson(
    //     person.name,
    //     person.lastName,
    //     person.age,
    //     person.name + " " + person.lastName
    // );

    return fullPerson;
  }

  private async validateName(person: Person): Promise<void> {
    if (!person.name || !person.lastName) {
      throw new Error("Name and lastName are required");
    }
    if (person.name.length < 3) {
      throw new Error("Name must have at least 3 characters");
    }
  }

  private async validateAge(age: number) {
    if (age < 18) {
      throw new Error("Person must be adult");
    }
  }
}
