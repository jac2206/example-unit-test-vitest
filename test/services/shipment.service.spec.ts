import { describe, it, expect } from "vitest";
import { ShipmentService } from "../../src/services/shipment.service";

describe("ShipmentService", () => {
  it("should calculate shipping cost for a package with weight 3", async () => {
    // Arrange
    const shipmentService = new ShipmentService();
    const pkg = { id: "1", weight: 3, destination: "New York" };

    // Act
    const cost = await shipmentService.shipPackageCalculate(pkg);

    // Assert
    expect(cost).toBe(10000);
  });

  it("should calculate shipping cost for a package with weight 10", async () => {
    // Arrange
    const shipmentService = new ShipmentService();
    const pkg = { id: "2", weight: 10, destination: "Los Angeles" };

    // Act
    const cost = await shipmentService.shipPackageCalculate(pkg);

    // Assert
    expect(cost).toBe(20000);
  });

  it("should calculate shipping cost for a package with weight 25", async () => {
    // Arrange
    const shipmentService = new ShipmentService();
    const pkg = { id: "3", weight: 25, destination: "Chicago" };

    // Act
    const cost = await shipmentService.shipPackageCalculate(pkg);

    // Assert
    expect(cost).toBe(50000);
  });

  it("should throw an error for a package with weight 0", async () => {
    // Arrange
    const shipmentService = new ShipmentService();
    const pkg = { id: "4", weight: 0, destination: "Houston" };

    // Act & Assert
    await expect(shipmentService.shipPackageCalculate(pkg)).rejects.toThrow(
      "Weight must be greater than 0",
    );
  });

  it("should throw an error for a package with negative weight", async () => {
    // Arrange
    const shipmentService = new ShipmentService();
    const pkg = { id: "5", weight: -5, destination: "Miami" };

    // Act & Assert
    await expect(shipmentService.shipPackageCalculate(pkg)).rejects.toThrow(
      "Weight must be greater than 0",
    );
  });
});
