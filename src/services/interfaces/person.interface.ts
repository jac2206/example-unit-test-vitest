import { FullPerson } from "../../entities/person.entity";

export interface Person {
  name: string;
  lastName: string;
  age: number;
}

// export interface FullPerson{
//     name: string,
//     lastName: string,
//     age: number,
//     fullName: string
// }

export interface IPersonService {
  createPerson(person: Person): Promise<FullPerson>;
}
