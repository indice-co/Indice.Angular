import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderMetaItem, MenuOption, ViewAction } from '../../../types';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'lib-model-view-layout',
    templateUrl: './model-view-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ModelViewLayoutComponent implements OnInit, OnDestroy {
  public showRightPaneSM = false;
  @Input() title = 'no title';
  // tslint:disable-next-line:no-input-rename
  @Input('primary-links') primary: { type?: string, text: string, link: string, icon?: string, exact? : boolean }[] | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('secondary-links') secondary: { type?: string, text: string, link: string, icon?: string, exact? : boolean }[] | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('meta-items') metaItems: HeaderMetaItem[] | null = [
    // { key: 'test', icon: Icons.Badges, text: 'βρέθηκαν 200 αποτελέσματα' }
  ];
  @Input() icon: string | null = null;
  @Input() busy = false;
  @Input() actions: ViewAction[] | null = null;
  @Output() onAction: EventEmitter<ViewAction> = new EventEmitter<ViewAction>();
  private optionsLoaded = false;
  private _options: MenuOption[] = [];
  public selectedTab: any;
  private selectedTabSub$: Subscription | undefined;
  public get tabsOptions(): MenuOption[] {
    if(!this.optionsLoaded) {
      this.optionsLoaded = true;
      if(this.primary) {
        this.primary.forEach(p => {
          this._options.push(new MenuOption(p.text, p.link, undefined, undefined, p.icon));
        });
      }

      if(this.secondary) {
        this.secondary.forEach(p => {
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
