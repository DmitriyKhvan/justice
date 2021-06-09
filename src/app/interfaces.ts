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

export interface ContractInfo {
  body: {};
  case_close?: boolean;
  current_task: { task_id: number; task_status: number; task_step: string };
  sp?: {};
  tasks: [];
}
