export interface Environment {
  production: boolean;
  dbUrlBek: any;
  fileBaseUrl: any;
  authUrl: any;
}

declare global {
  interface Window {
    __env: any;
  }
}
