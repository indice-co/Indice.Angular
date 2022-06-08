import { IShellConfig, ShellLayoutType } from './../../../ng-components/src/lib/types';

export const SampleAppShellConfig: IShellConfig = {
  layout : ShellLayoutType.Sidebar,
  appLogo : 'https://tailwindui.com/img/logos/workflow-mark.svg?color=white',
  appLogoAlt : 'your app name here',
  fluid: false,
  showFooter: true,
  showHeader: true,
  showLangsOnHeader: true,
  showAlertsOnHeader : true,
  showUserNameOnHeader : true
};
