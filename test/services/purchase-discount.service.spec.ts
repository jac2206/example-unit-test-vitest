import { describe, it, expect } from "vitest";
import { PurchaseDiscountService } from "../../src/services/purchase-discount.service";

describe("PurchaseDiscountService", () => {
  it("should calculate discount for products with total price greater than 500000 and less than or equal to 1000000", async () => {
    // Arrange
    const purchaseDiscountService = new PurchaseDiscountService();
    const products = [
      { id: "1", name: "Product 1", price: 6000 },
      { id: "2", name: "Product 2", price: 500000 },
      { id: "3", name: "Product 3", price: 2000 },
    ];

    // Act
    const result = await purchaseDiscountService.calculateDiscount(products);

    // Assert
    expect(result.discount).toBe(50800);
  });

  it("should calculate discount for products with total price greater than 1000000", async () => {
    // Arrange
    const purchaseDiscountService = new PurchaseDiscountService();
    const products = [
      { id: "1", name: "Product 1", price: 600000 },
      { id: "2", name: "Product 2", price: 500000 },
      { id: "3", name: "Product 3", price: 200000 },
      { id: "4", name: "Product 4", price: 300000 },
    ];

    // Act
    const result = await purchaseDiscountService.calculateDiscount(products);

    // Assert
    expect(result.discount).toBe(240000);
  });

  it("should return 0 discount for products with total price less than or equal to 500000", async () => {
    // Arrange
    const purchaseDiscountService = new PurchaseDiscountService();
    const products = [
      { id: "1", name: "Product 1", price: 200000 },
      { id: "2", name: "Product 2", price: 100000 },
      { id: "3", name: "Product 3", price: 150000 },
    ];

    // Act
    const result = await purchaseDiscountService.calculateDiscount(products);

    // Assert
    expect(result.discount).toBe(0);
  });

  it("should throw an error for empty products array", async () => {
    // Arrange
    const purchaseDiscountService = new PurchaseDiscountService();
    const products: any[] = [];

    // Act & Assert
    await expect(purchaseDiscountService.calculateDiscount(products)).rejects.toThrow(
      "Products array cannot be empty",
    );
  });

  it("should throw an error for null products array", async () => {
    // Arrange
    const purchaseDiscountService = new PurchaseDiscountService();
    const products: any = null;

    // Act & Assert
    await expect(purchaseDiscountService.calculateDiscount(products)).rejects.toThrow(
      "Products array cannot be empty",
    );
  });
});
