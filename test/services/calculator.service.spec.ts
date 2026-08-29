import {vi, describe, expect, test, it} from "vitest";
import {CalculatorService} from "../../src/services/calculator.service";

describe("CalculatorService", () => {

    it("should add two numbers correctly", async () => {
        // Arrange
        const service = new CalculatorService();
        const a = 5;
        const b = 10;

        // Act

        const result = await service.add(a, b);

        // Assert
        expect(result).toBe(15);

    })    

    it("should subtract two numbers correctly", async () => {
        // Arrange
        const service = new CalculatorService();
        const a = 10;
        const b = 5;

        // Act
        const result = await service.subtract(a, b);

        // Assert
        expect(result).toBe(5);

    });

    it("should multiply two numbers correctly", async () => {
        // Arrange
        const service = new CalculatorService();
        const a = 5;
        const b = 10;

        // Act
        const result = await service.multiply(a, b);

        // Assert
        expect(result).toBe(50);

    });

    it("should division two numbers correctly", async () => {
        // Arrange
        const service = new CalculatorService();
        const a = 10;
        const b = 2;

        // Act
        const result = await service.divison(a, b);

        // Assert
        expect(result).toBe(5);

    });

    it("should division two numbers correctly", async () => {
        // Arrange
        const service = new CalculatorService();
        const a = 10;
        const b = 0;
        // Assert
       await expect(service.divison(a,b)).rejects.toThrow("No se aceptan divisiones sobre cero");
    });

})