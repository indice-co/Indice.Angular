export interface IAuthSettings {
  authority: string;
  client_id: string;
  redirect_uri: string;
  post_logout_redirect_uri: string;
  response_type: string;
  scope: string;
  filterProtocolClaims: boolean;
  loadUserInfo: boolean;
  silent_redirect_uri: string;
}

export class DefaultAuthSettings implements IAuthSettings {
  constructor() {
  }
  authority = '';
  // tslint:disable-next-line:variable-name
  client_id = '';
  // tslint:disable-next-line:variable-name
  redirect_uri = '';
  // tslint:disable-next-line:variable-name
  post_logout_redirect_uri = '';
  // tslint:disable-next-line:variable-name
  response_type = '';
  scope = '';
  filterProtocolClaims = true;
  loadUserInfo = false;
  // tslint:disable-next-line:variable-name
  silent_redirect_uri = '';
}
