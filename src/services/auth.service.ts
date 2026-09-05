import { IAuthService } from "./interfaces/auth.interface";

export class AuthService implements IAuthService {
  constructor() {}

  async login(username: string, password: string): Promise<boolean> {
    this.validateUserAndPassMandatory(username, password);
    if (username === "admin" && password === "123") {
      return true;
    } else {
      return false;
    }
  }

  private validateUserAndPassMandatory(username: string, password: string): boolean {
    if (!username) {
      throw new Error("Username is mandatory");
    }
    if (!password) {
      throw new Error("Password is mandatory");
    }
    return true;
  }
}
