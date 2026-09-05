export interface IAuthService {
  login(username: string, password: string): Promise<boolean>;
  validateRulesPassword(password: string): Promise<string>;
}
