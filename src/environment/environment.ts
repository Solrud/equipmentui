// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.testbazis.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  auth: false,
  production: false,
  frontendURL: "https://localhost:4200",
  backendURL: "https://testbazis:8103/equipment", // unsec getaway
  authURL: 'https://testbazis.avi.motor.loc:3333/api',
  loginUrl: 'https://testbazis.avi.motor.loc:3333',
};


/*      equipment
*     prod seq 8100
*     dev unseq 8101
* -----------------------
*   equipment gateway
*     prod seq 8102
*     dev unseq 8103
*/
