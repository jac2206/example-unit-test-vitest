export interface IAuthService {
  login(username: string, password: string): Promise<boolean>;
}
