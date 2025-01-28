import { Component, Inject } from "@angular/core";
import { AUTH_SETTINGS } from "projects/ng-auth/src/lib/tokens";
import { APP_SETTINGS, IAUTH_SETTINGS } from "projects/ng-config/src/lib/tokens";
import { IAppSettings } from "projects/ng-config/src/lib/types";


@Component({
  selector: 'app-root',
  template: `
    <lib-shell-layout [sidebarFooterTemplate]="sidebarFooter"></lib-shell-layout>
    <ng-template #sidebarFooter>
      <span>
        Powered by <a class="text-blue-400" href="https://www.indice.gr">Indice</a>
        <span class="ml-1" style="color: red">♥</span> 
      </span> v6.0.3
    </ng-template>
  `,
})
export class AppComponent {
  title = 'app';
  constructor(@Inject(IAUTH_SETTINGS) private iauthSettings: IAppSettings, @Inject(APP_SETTINGS) private appSettings: IAppSettings, @Inject(AUTH_SETTINGS) authSettings: IAppSettings) {
    console.log(`IAUTH_SETTINS: `, iauthSettings)
    console.log(`APP_SETTINGS: `, appSettings)
    console.log(`AUTH_SETTINGS: `, authSettings)
  }
}
