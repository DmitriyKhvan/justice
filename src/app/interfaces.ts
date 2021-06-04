export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  tokenData: object;
}

export interface refreshTokenContent {
  access_token: string;
  refresh_token: string;
}

export interface LoginPass {
  login: string;
  password: string;
}
