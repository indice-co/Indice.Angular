export interface IAppLinks {
  public: NavLink[];
  main: NavLink[];
  profile: NavLink[];
  profileActions: NavLink[];
  legal: NavLink[];
  brand: NavLink[];
}

export class NavLink {
  constructor(text: string, path: string, exact: boolean = false, external: boolean = false, icon?: string) {
    this.text = text;
    this.path = path;
    this.exact = exact;
    this.external = external;
    this.icon = icon;
  }
  public text: string;
  public path: string;
  public exact: boolean;
  public external: boolean;
  public icon: string | undefined;
}

export class ExternalNavLink extends NavLink {
  constructor(text: string, path: string, icon?: string) {
    super(text, path, true, true, icon);
  }
}

export class FragmentNavLink extends NavLink {
  constructor(text: string, path: string, icon?: string) {
    super(text, path, true, true, icon);
  }
}

export class ViewAction {
  public type: string;
  public key: string | null;
  public param: any;
  public icon: string;
  public tooltip: string | null;

  constructor(type: string, key: string | null, param: any, icon: string, tooltip: string | null) {
    this.type = type;
    this.key = key;
    this.param = param;
    this.icon = icon;
    this.tooltip = tooltip;
  }
}

export class RouterViewAction extends ViewAction {
  public outlet: string | null = null;
  public link: string | null = null;
  constructor(icon: string, link: string, outlet: string | null, tooltip: string | null) {
    super('router-link', null, null, icon, tooltip);
    this.outlet = outlet;
    this.link = link;
  }
}


export class SwitchViewAction extends ViewAction {
  constructor(view: string, icon: string, tooltip: string | null) {
    super('switch-view', null, view, icon, tooltip);
  }
}

export interface IResultSet<T> {
  count: number;
  items: T[];
}

export class HeaderMetaItem {
  public key: string | null = null;
  public icon: string | null = null;
  public text: string | null = null;
}

export class MenuOption {
  constructor(text: string, value: any) {
    this.text = text;
    this.value = value;
  }
  public text: string;
  public value: any;
}

export interface IAddress {
  id?: string;
  street?: string | null;
  streetNumber?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
}

export interface IHeaderComponent {
}

export interface IShellConfig {
  showHeader: boolean;
  customHeaderComponent?: any;
  showFooter: boolean;
  customFooterComponent?: any;
  fluid: boolean;
}

export class DefaultShellConfig implements IShellConfig {
  showHeader = true;
  showFooter = true;
  fluid = false;
}
