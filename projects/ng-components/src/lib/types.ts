import { Observable } from 'rxjs';


export interface IAppNotifications {
  messages: Observable<IResultSet<NavLink>>;
  getMessage?: (predicate: (value: any, index: number, obj: any[]) => any) => any | undefined;
  refresh?: () => void | undefined;
  inboxAction?: () => void | undefined;
}

export interface IAppLanguagesService {
  options: Observable<MenuOption[]> | undefined;
  selected?: string;
  default?: string;
  setSelected?: (lang: string) => void | undefined;
}

export interface IAppLinks {
  public: Observable<NavLink[]>;
  main: Observable<NavLink[]>;
  profile: Observable<NavLink[]>;
  profileActions: Observable<NavLink[]>;
  legal: Observable<NavLink[]>;
  brand: Observable<NavLink[]>;
  notifications?: Observable<NavLink>;
}


export class NavLink {
  constructor(text: string, path: string, exact: boolean = false, external: boolean = false, icon?: string, data?: any) {
    this.text = text;
    this.path = path;
    this.exact = exact;
    this.external = external;
    this.icon = icon;
    this.data = data;
  }
  public text: string;
  public path: string;
  public exact: boolean;
  public external: boolean;
  public icon: string | undefined;
  public type = 'router';
  public data: any | undefined;
}

export class ExternalNavLink extends NavLink {
  constructor(text: string, path: string, openInNewTab?: boolean, icon?: string) {
    super(text, path, true, openInNewTab, icon);
  }
  public type = 'external';
}

export class FragmentNavLink extends NavLink {
  constructor(text: string, path: string, icon?: string) {
    super(text, path, true, true, icon);
  }
  public type = 'fragment';
}

export class NotificationNavLink extends NavLink {
  constructor(text: string, path: string, public isRead: boolean, public creationDate?: Date) {
    super(text, path, true, false, undefined);
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

export class ListViewType {
  public static Tiles = 'tiles';
  public static Table = 'table';
  public static Map = 'map';
  public static Gallery = 'gallery';
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
  constructor(text: string, value: any, description?: string, data?: any, icon?: string) {
    this.text = text;
    this.value = value;
    this.description = description;
    this.data = data;
    this.icon = icon;
  }
  public text: string;
  public value: any;
  public description: string | undefined;
  public data: any | undefined;
  public icon: string | undefined;
}

export interface IAddress {
  id?: string;
  street?: string | null;
  streetNumber?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country?: string | null;
}

export interface IShellConfig {
  layout?: ShellLayoutType;
  appLogo: string;
  appLogoAlt: string;
  showHeader: boolean;
  showUserNameOnHeader?: boolean;
  showAlertsOnHeader?: boolean;
  customHeaderComponent?: any;
  showFooter: boolean;
  customFooterComponent?: any;
  fluid: boolean;
  showLangsOnHeader?: boolean;
}

export enum ShellLayoutType {
  Stacked = 'Stacked',
  Sidebar = 'Sidebar'
}

export class DefaultShellConfig implements IShellConfig {
  layout = ShellLayoutType.Stacked;
  appLogo = 'https://tailwindui.com/img/logos/workflow-mark.svg?color=white';
  appLogoAlt = 'your app name here';
  showHeader = true;
  showUserNameOnHeader = false;
  showAlertsOnHeader = false;
  showFooter = true;
  fluid = false;
}

export enum SCREEN_SIZE {
  XS,
  SM,
  MD,
  LG,
  XL
}

export interface IScreenSize {
  id: SCREEN_SIZE;
  name: string;
  css: string;
}

export enum ToastType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning'
}

export const NULL_TOAST = { title : '_____NULL_____' } as Toast;

export interface Toast {
  type: ToastType;
  title: string;
  body: string;
  delay: number;
}

export enum SidePaneSize {
   Default = '',
   Small25 = '25%',
   Medium50 = '50%',
   Large75 = '75%'
}

export enum SidePaneOverlayType {
  Default = '',
  None = '-opacity-0',
  Light = '',
  Dark = '-opacity-50'
}


export interface IValidationProblemDetails {
  type?: string | undefined;
  title?: string | undefined;
  status?: number | undefined;
  detail?: string | undefined;
  instance?: string | undefined;
  errors?: { [key: string]: string[]; } | undefined;
}
