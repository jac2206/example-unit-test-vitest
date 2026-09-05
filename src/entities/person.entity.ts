export class FullPerson {
  constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly age: number,
    public readonly fullName: string,
  ) {}

  toPersistence() {
    return {
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      fullName: this.fullName,
    };
  }
}
