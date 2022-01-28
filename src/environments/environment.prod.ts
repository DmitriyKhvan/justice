import { Environment } from './interface';

export const environment: Environment = {
  production: true,
  // dbUrlBek: 'http://10.1.1.77:3000/api/v1.0.0/justice',
  dbUrlBek: 'http://' + window.location.hostname + ':3000/api/v1.0.0/justice',
  // fileBaseUrl: 'http://10.1.1.20:9002',
  fileBaseUrl: 'http://' + window.location.hostname + ':9002',

  // authUrl: 'http://' + window.location.hostname + '/auth',
  authUrl: `http://auth.flexit.uz/auth`,
};
