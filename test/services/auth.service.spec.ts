import { vi, describe, it, expect, beforeEach } from "vitest";
import { AuthService } from "../../src/services/auth.service";

describe("AuthService", () => {
  it("should return true for valid credentials", async () => {
    // Arrange
    const service = new AuthService();
    const username = "admin";
    const password = "123";

    // Act
    const result = await service.login(username, password);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false for invalid credentials", async () => {
    // Arrange
    const service = new AuthService();
    const username = "user";
    const password = "wrongpassword";

    // Act
    const result = await service.login(username, password);

    // Assert
    expect(result).toBe(false);
  });

  it("should throw error if username is empty", async () => {
    // Arrange
    const service = new AuthService();
    const username = "";
    const password = "123";

    // Act & Assert
    await expect(service.login(username, password)).rejects.toThrow(
      "Username is mandatory",
    );
  });

  it("should throw error if password is empty", async () => {
    // Arrange
    const service = new AuthService();
    const username = "admin";
    const password = "";

    // Act & Assert
    await expect(service.login(username, password)).rejects.toThrow(
      "Password is mandatory",
    );
  });
});
