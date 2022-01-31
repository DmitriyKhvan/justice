import { Environment } from './interface';

export const environment: Environment = {
  production: true,
  // dbUrlBek: 'http://10.1.1.77:3000/api/v1.0.0/justice',
  // dbUrlBek: 'http://' + window.location.hostname + ':3000/api/v1.0.0/justice',
  // fileBaseUrl: 'http://' + window.location.hostname + ':9002',
  // authUrl: `http://auth.flexit.uz/auth`,

  dbUrlBek: window.__env.dbUrlBek,
  fileBaseUrl: window.__env.fileBaseUrl,
  authUrl: window.__env.authUrl,
};
