import { it, describe, expect } from "vitest";
import { PersonService } from "../../src/services/person.service";

describe("PersonService", () => {
  it("Create person is Julian", async () => {
    const service = new PersonService();
    const person = {
      name: "Julian",
      lastName: "Arango",
      age: 32,
    };

    const result = await service.createPerson(person);

    expect(result).toBeDefined();
    expect(result.name).toEqual("Julian");
  });
  it("should throw error if underage", async () => {
    // Arrange
    const service = new PersonService();
    const person = { name: "Julian", lastName: "Arango", age: 15 };

    // Act & Assert
    await expect(service.createPerson(person)).rejects.toThrow("Person must be adult");
  });
  it("should throw error if name too short", async () => {
    // Arrange
    const service = new PersonService();
    const person = { name: "Ju", lastName: "Arango", age: 30 };

    // Act & Assert
    await expect(service.createPerson(person)).rejects.toThrow(
      "Name must have at least 3 characters",
    );
  });

  it("should throw error lastName required", async () => {
    // Arrange
    const service = new PersonService();
    const person = { name: "Julian", lastName: "", age: 30 };

    // Act & Assert
    await expect(service.createPerson(person)).rejects.toThrow(
      "Name and lastName are required",
    );
  });
});
