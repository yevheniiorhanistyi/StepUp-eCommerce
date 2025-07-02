import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class TokenService implements TokenCache {
  private token: TokenStore;

  constructor() {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: ''
    };
  }

  get(): TokenStore {
    return this.token;
  }

  set(cache: TokenStore): void {
    this.token = cache;
  }

  clear(): void {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: ''
    };
  }
}

export const tokenServiceInstance = new TokenService();
