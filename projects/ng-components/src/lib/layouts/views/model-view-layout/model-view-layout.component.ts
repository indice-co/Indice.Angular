import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderMetaItem, MenuOption, ViewAction } from '../../../types';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';
import { DropDownMenuComponent } from '../../../controls/drop-down-menu/drop-down-menu.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'lib-model-view-layout',
    templateUrl: './model-view-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ViewLayoutComponent, DropDownMenuComponent, RouterLinkActive, RouterLink, RouterOutlet]
})
export class ModelViewLayoutComponent implements OnInit, OnDestroy {
  public showRightPaneSM = false;
  readonly title = input('no title');
  // tslint:disable-next-line:no-input-rename
  readonly primary = input<{
    type?: string;
    text: string;
    link: string;
    icon?: string;
    exact?: boolean;
}[] | null>(null, { alias: "primary-links" });
  // tslint:disable-next-line:no-input-rename
  readonly secondary = input<{
    type?: string;
    text: string;
    link: string;
    icon?: string;
    exact?: boolean;
}[] | null>(null, { alias: "secondary-links" });
  // tslint:disable-next-line:no-input-rename
  readonly metaItems = input<HeaderMetaItem[] | null>([
// { key: 'test', icon: Icons.Badges, text: 'βρέθηκαν 200 αποτελέσματα' }
], { alias: "meta-items" });
  readonly icon = input<string | null>(null);
  readonly busy = input(false);
  readonly actions = input<ViewAction[] | null>(null);
  readonly onAction = output<ViewAction>();
  private optionsLoaded = false;
  private _options: MenuOption[] = [];
  public selectedTab: any;
  private selectedTabSub$: Subscription | undefined;
  public get tabsOptions(): MenuOption[] {
    if(!this.optionsLoaded) {
      this.optionsLoaded = true;
      const primary = this.primary();
      if(primary) {
        primary.forEach(p => {
          this._options.push(new MenuOption(p.text, p.link, undefined, undefined, p.icon));
        });
      }

      const secondary = this.secondary();
      if(secondary) {
        secondary.forEach(p => {
          this._options.push(new MenuOption(p.text, p.link, undefined, undefined, p.icon));
        });
      }
      
      if(this._options && this._options.length > 0) {
        this.selectedTab = this._options[0].value; 
      }
    }
    return this._options;
  }
  constructor( private location: Location, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.selectedTabSub$ = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        if(event.urlAfterRedirects) {
          var urlParts = event.urlAfterRedirects.split('/');
          if(urlParts && urlParts.length > 0) {
            const lastPart = urlParts[urlParts.length-1];
            this.selectedTab = lastPart.split('?')[0];
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if(this.selectedTabSub$) {
      this.selectedTabSub$.unsubscribe();
    }
  }


  public onSidePaneActivated($event: any): void  {
    this.showRightPaneSM = true;
  }

  public onSidePaneDeactivated($event: any): void  {
    this.showRightPaneSM = false;
  }

  public closeSidePane(): void {
    this.location.back();
  }

  public navigateLink(link: any): void {
    this.router.navigate([link], {relativeTo: this.route});
  }

  public emitActionClick(action: ViewAction): void {
    this.onAction.emit(action);
  }
}
