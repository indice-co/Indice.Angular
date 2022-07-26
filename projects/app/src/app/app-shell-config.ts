import { IShellConfig, ShellLayoutType } from './../../../ng-components/src/lib/types';

export const SampleAppShellConfig: IShellConfig = {
  appLogo : 'https://tailwindui.com/img/logos/workflow-mark.svg?color=white',
  appLogoAlt : 'your app name here',
  breadcrumb: true,
  fluid: false,
  layout : ShellLayoutType.Sidebar,
  showAlertsOnHeader : true,
  showFooter: true,
  showHeader: true,
  showLangsOnHeader: true,
  showUserNameOnHeader : true
};
