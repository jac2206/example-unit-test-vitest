import { isVariableDeclaration } from "typescript";
import { IAuthService } from "./interfaces/auth.interface";

enum passwordClassification {
  WEAK = "weak",
  MEDIUM = "medium",
  STRONG = "strong",
}

export class AuthService implements IAuthService {
  constructor() {}

  async login(username: string, password: string): Promise<boolean> {
    await this.validateUserAndPassMandatory(username, password);
    if (username === "admin" && password === "123") {
      return true;
    } else {
      return false;
    }
  }

  async validateRulesPassword(password: string): Promise<string> {
    await this.validatePasswordMandatory(password);
    return await this.classifyPassword(password);
  }

  private async validateUserAndPassMandatory(
    username: string,
    password: string,
  ): Promise<boolean> {
    if (!username) {
      throw new Error("Username is mandatory");
    }
    await this.validatePasswordMandatory(password);
    return true;
  }

  private async validatePasswordMandatory(password: string): Promise<boolean> {
    if (!password) {
      throw new Error("Password is mandatory");
    }
    return true;
  }

  private async classifyPassword(password: string): Promise<string> {
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return passwordClassification.STRONG;
    }
    if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return passwordClassification.MEDIUM;
    }
    return passwordClassification.WEAK;
  }
}
