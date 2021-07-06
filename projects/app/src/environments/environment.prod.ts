export const environment = {
  production: true,
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
