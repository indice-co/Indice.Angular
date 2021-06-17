// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_base_url: '',
  api_docs: '',
  auth_settings : {
    authority: 'http://localhost:8080',
    client_id: 'sample-app',
    filterProtocolClaims: false,
    loadUserInfo: true,
    post_logout_redirect_uri: 'http://localhost:4200',
    redirect_uri: 'http://localhost:4200/auth-callback',
    response_type: 'code',
    scope: 'dummy',
    //silent_redirect_uri: 'http://localhost:4200/auth-renew'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
