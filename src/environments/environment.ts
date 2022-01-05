// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './interface';

export const environment: Environment = {
  production: false,
  dbUrl: 'http://10.1.1.20:3000',
  dbUrlBek: 'http://10.1.1.77:3001/api/v1.0.0/justice',
  // dbUrlBek: 'http://' + window.location.hostname + ':3000/api/v1.0.0/justice',
  fileBaseUrl: 'http://10.1.1.77:9002',
  // fileBaseUrl: 'http://10.1.1.77:9009',
  // fileBaseUrl: 'http://' + window.location.hostname + ':9002',

  authUrl: `http://auth.flexit.uz/auth`,
  // authUrl: `http://172.16.10.66:80/auth`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
