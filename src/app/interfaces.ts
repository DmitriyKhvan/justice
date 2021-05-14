export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  tokenData: object;
}

export interface RefreshTokenContent {
  access_token: string;
  refresh_token: string;
}
