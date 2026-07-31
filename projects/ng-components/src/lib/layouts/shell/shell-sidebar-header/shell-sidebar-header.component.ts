
import { AuthService } from '@indice/ng-auth';
import { Component, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { APP_LINKS, SHELL_CONFIG } from '../../../tokens';
import { ShellHeaderComponent } from '../shell-header/shell-header.component';
import { ShellLayoutType } from '../../../types';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { UserProfileMenuComponent } from '../../../controls/user-profile-menu/user-profile-menu.component';
import { NotificationsIndicatorComponent } from '../../../controls/notifications-indicator/notifications-indicator.component';
import { LanguageSelectionComponent } from '../../../controls/language-selection/language-selection.component';

@Component({
    selector: 'lib-shell-sidebar-header',
    templateUrl: './shell-sidebar-header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClickOutsideDirective, UserProfileMenuComponent, NotificationsIndicatorComponent, LanguageSelectionComponent]
})
export class ShellSidebarHeaderComponent extends ShellHeaderComponent {
  constructor(@Inject(AuthService) protected authService: AuthService,
  @Inject(Router) protected router: Router,
  @Inject(ActivatedRoute) protected route: ActivatedRoute,
  @Inject(SHELL_CONFIG) public config: any,
  @Inject(APP_LINKS) public links: any) {
    super(authService, router, route, config, links);
  }

}
