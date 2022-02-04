// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './interface';

export const environment: Environment = {
  production: false,
  dbUrlBek: 'http://10.1.1.177:3000/api/v1.0.0/justice',
  fileBaseUrl: 'http://10.1.1.20:9002',
  // authUrl: `https://auth.flexit.uz/auth`,
  authUrl: `http://10.1.1.99:8080/auth`,

  // dbUrlBek: window.__env.dbUrlBek,
  // fileBaseUrl: window.__env.fileBaseUrl,
  // authUrl: window.__env.authUrl,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
