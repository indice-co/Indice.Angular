// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_base_url: 'https://indice-idsrv.azurewebsites.net',
  api_docs: '',
  auth_settings : {
    authority: 'https://indice-idsrv.azurewebsites.net',
    client_id: 'indice-ng-sample-app',
    filterProtocolClaims: true,
    loadUserInfo: false,
    post_logout_redirect_uri: 'http://localhost:4200/logged-out',
    redirect_uri: 'http://localhost:4200/auth-callback',
    response_type: 'code',
    scope: 'openid profile email',
    useRefreshToken: false,
    //  authority: 'https://my.inpolicy.eu',
    // // authority: 'https://localhost:44391/',
    // client_id: 'inpolicy-admin',
    // redirect_uri: 'http://localhost:4200/auth-callback',
    // post_logout_redirect_uri: 'http://localhost:4200/logged-out',
    // response_type: 'code',
    // useRefreshToken: false,
    // scope: 'openid profile email facade:backoffice',
    // filterProtocolClaims: true,
    // loadUserInfo: true
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
