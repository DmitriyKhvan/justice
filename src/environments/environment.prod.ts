import { Environment } from './interface';

export const environment: Environment = {
  production: true,
  dbUrl: `http://${window.location.hostname}:3000`,
  fileBaseUrl: `http://${window.location.hostname}:9001`
};
