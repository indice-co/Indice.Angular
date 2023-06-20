
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddressPipe } from './pipes/address.pipe';
import { AdvancedSearchComponent } from './controls/advanced-search/advanced-search.component';
import { AuthCallbackComponent } from './pages/auth/auth-callback/auth-callback.component';
import { AuthRenewComponent } from './pages/auth/auth-renew/auth-renew.component';
import { AvatarInitialsComponent } from './controls/avatar-initials/avatar-initials.component';
import { BreadcrumbComponent } from './controls/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './services/breadcrumb.service';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CollapsiblePanelComponent } from './controls/collapsible-panel/collapsible-panel.component';
import { ComboboxComponent } from './controls/combobox/combobox.component';
import { DatepickerComponent } from './controls/date-picker/date-picker.component';
import { DropDownMenuComponent } from './controls/drop-down-menu/drop-down-menu.component';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { DynamicComponentHostDirective } from './directives/dynamic-component-host.directive';
import { ErrorComponent } from './pages/http-status/error/error.component';
import { FormLayoutComponent } from './layouts/views/form-layout/form-layout.component';
import { IndiceAuthModule } from '@indice/ng-auth';
import { KpiTileComponent } from './controls/kpi-tile/kpi-tile.component';
import { LanguageSelectionComponent } from './controls/language-selection/language-selection.component';
import { LibStepComponent } from './controls/stepper/lib-step.component';
import { LibStepInfoDirective } from './controls/stepper/lib-step-info.directive';
import { LibStepLabelDirective } from './controls/stepper/lib-step-label.directive';
import { LibStepperComponent } from './controls/stepper/lib-stepper.component';
import { LibTabComponent } from './controls/tabs/lib-tab.component';
import { LibTabGroupComponent } from './controls/tabs/lib-tab-group.component';
import { ListColumnComponent } from './controls/list-view/list-column.component';
import { ListDetailsSectionComponent } from './controls/list-view/list-details-section.component';
import { ListTileComponent } from './controls/list-view/list-tile.component';
import { ListViewComponent } from './controls/list-view/list-view.component';
import { ListViewEmptyStateComponent } from './controls/list-view/list-view-empty-state.component';
import { LoggedOutComponent } from './pages/auth/logged-out/logged-out.component';
import { ModelViewLayoutComponent } from './layouts/views/model-view-layout/model-view-layout.component';
import { NavLinksListComponent } from './controls/nav-links-list/nav-links-list.component';
import { NotificationsIndicatorComponent } from './controls/notifications-indicator/notifications-indicator.component';
import { PageNotFoundComponent } from './pages/http-status/page-not-found/page-not-found.component';
import { PagerComponent } from './controls/pager/pager.component';
import { ShellFooterComponent } from './layouts/shell/shell-footer/shell-footer.component';
import { ShellHeaderComponent } from './layouts/shell/shell-header/shell-header.component';
import { ShellLayoutComponent } from './layouts/shell/shell-layout/shell-layout.component';
import { ShellSidebarComponent } from './layouts/shell/shell-sidebar/shell-sidebar.component';
import { ShellSidebarHeaderComponent } from './layouts/shell/shell-sidebar-header/shell-sidebar-header.component';
import { ShellSidebarLayoutComponent } from './layouts/shell/shell-sidebar-layout/shell-sidebar-layout.component';
import { ShellStackedLayoutComponent } from './layouts/shell/shell-stacked-layout/shell-stacked-layout.component';
import { SidePaneComponent } from './controls/side-pane/side-pane.component';
import { SideViewLayoutComponent } from './layouts/views/side-view-layout/side-view-layout.component';
import { SkeletonLoaderComponent } from './controls/skeleton-loader/skeleton-loader.component';
import { ToasterComponent } from './controls/toaster/toaster.component';
import { ToasterContainerComponent } from './controls/toaster/toaster-container.component';
import { ToasterService } from './services/toaster.service';
import { ToggleComponent } from './controls/toggle/toggle.component';
import { UnauthorizedComponent } from './pages/http-status/unauthorized/unauthorized.component';
import { UserProfileMenuComponent } from './controls/user-profile-menu/user-profile-menu.component';
import { ViewLayoutComponent } from './layouts/views/view-layout/view-layout.component';
import { LibTabLabelDirective, UserSettingsService } from '../public-api';
import { ToggleButtonComponent } from './controls/toggle-button/toggle-button.component';
import { ToggleButtonsListComponent } from './controls/toggle-buttons-list/toggle-buttons-list.component';
import { ContentTileComponent } from './controls/content-tile/content-tile.component';
import { ContentTileItemComponent } from './controls/content-tile/content-tile-item/content-tile-item.component';
import { ContentTileHeaderComponent } from './controls/content-tile/content-tile-header/content-tile-header.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { StatsGridComponent } from './controls/stats-grid/stats-grid.component';
import { ProgressBarComponent } from './controls/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AddressPipe,
    AdvancedSearchComponent,
    AuthCallbackComponent,
    AuthRenewComponent,
    AvatarInitialsComponent,
    BreadcrumbComponent,
    ClickOutsideDirective,
    CollapsiblePanelComponent,
    ComboboxComponent,
    DatepickerComponent,
    DropDownMenuComponent,
    DurationFormatPipe,
    ShortNumberPipe,
    DynamicComponentHostDirective,
    ErrorComponent,
    FormLayoutComponent,
    KpiTileComponent,
    LanguageSelectionComponent,
    LibStepComponent,
    LibStepInfoDirective,
    LibStepLabelDirective,
    LibStepperComponent,
    LibTabComponent,
    LibTabGroupComponent,
    LibTabLabelDirective,
    ListColumnComponent,
    ListDetailsSectionComponent,
    ListTileComponent,
    ListViewComponent,
    ListViewEmptyStateComponent,
    LoggedOutComponent,
    ModelViewLayoutComponent,
    NavLinksListComponent,
    NotificationsIndicatorComponent,
    PageNotFoundComponent,
    PagerComponent,
    ShellFooterComponent,
    ShellHeaderComponent,
    ShellLayoutComponent,
    ShellSidebarComponent,
    ShellSidebarHeaderComponent,
    ShellSidebarLayoutComponent,
    ShellStackedLayoutComponent,
    SidePaneComponent,
    SideViewLayoutComponent,
    SkeletonLoaderComponent,
    ToasterComponent,
    ToasterContainerComponent,
    ToggleComponent,
    UnauthorizedComponent,
    UserProfileMenuComponent,
    ViewLayoutComponent,
    ToggleButtonComponent,
    ToggleButtonsListComponent,
    ContentTileComponent,
    ContentTileItemComponent,
    ContentTileHeaderComponent,
    StatsGridComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IndiceAuthModule,
    FormsModule
  ],
  exports: [
    AddressPipe,
    AuthCallbackComponent,
    AuthRenewComponent,
    AvatarInitialsComponent,
    BreadcrumbComponent,
    ClickOutsideDirective,
    CollapsiblePanelComponent,
    ComboboxComponent,
    DatepickerComponent,
    DropDownMenuComponent,
    DurationFormatPipe,
    ShortNumberPipe,
    ErrorComponent,
    FormLayoutComponent,
    KpiTileComponent,
    LibStepComponent,
    LibStepInfoDirective,
    LibStepLabelDirective,
    LibStepperComponent,
    LibTabComponent,
    LibTabGroupComponent,
    LibTabLabelDirective,
    ListColumnComponent,
    ListDetailsSectionComponent,
    ListTileComponent,
    ListViewComponent,
    ListViewEmptyStateComponent,
    LoggedOutComponent,
    ModelViewLayoutComponent,
    PageNotFoundComponent,
    PagerComponent,
    ShellFooterComponent,
    ShellHeaderComponent,
    ShellLayoutComponent,
    SidePaneComponent,
    SideViewLayoutComponent,
    SkeletonLoaderComponent,
    ToasterComponent,
    ToasterContainerComponent,
    ToggleComponent,
    UnauthorizedComponent,
    ViewLayoutComponent,
    ToggleButtonComponent,
    ToggleButtonsListComponent,
    ContentTileComponent,
    ContentTileItemComponent,
    ContentTileHeaderComponent,
    StatsGridComponent,
    ProgressBarComponent
  ]
})
export class IndiceComponentsModule {
  static forRoot(): ModuleWithProviders<IndiceComponentsModule> {
    return {
      ngModule: IndiceComponentsModule,
      providers: [
        BreadcrumbService,
        ToasterService,
        UserSettingsService
      ]
    };
  }
}
