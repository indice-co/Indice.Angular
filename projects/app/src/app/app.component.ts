import { Component } from "@angular/core";

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
  constructor() { }
}
