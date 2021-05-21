import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './pages/http-status/unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './pages/http-status/page-not-found/page-not-found.component';
import { ErrorComponent } from './pages/http-status/error/error.component';
import { LoggedOutComponent } from './pages/auth/logged-out/logged-out.component';
import { AuthCallbackComponent } from './pages/auth/auth-callback/auth-callback.component';
import { IndiceAuthModule } from '@indice/ng-auth';
import { SkeletonLoaderComponent } from './controls/skeleton-loader/skeleton-loader.component';
import { ListTileComponent } from './controls/list-view/list-tile.component';
import { ListColumnComponent } from './controls/list-view/list-column.component';
import { NgModule } from '@angular/core';
import { DropDownMenuComponent } from './controls/drop-down-menu/drop-down-menu.component';
import { ListViewComponent } from './controls/list-view/list-view.component';
import { PagerComponent } from './controls/pager/pager.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ShellFooterComponent } from './layouts/shell/shell-footer/shell-footer.component';
import { ShellHeaderComponent } from './layouts/shell/shell-header/shell-header.component';
import { ShellLayoutComponent } from './layouts/shell/shell-layout/shell-layout.component';
import { FormLayoutComponent } from './layouts/views/form-layout/form-layout.component';
import { ModelViewLayoutComponent } from './layouts/views/model-view-layout/model-view-layout.component';
import { SideViewLayoutComponent } from './layouts/views/side-view-layout/side-view-layout.component';
import { ViewLayoutComponent } from './layouts/views/view-layout/view-layout.component';
import { AuthRenewComponent } from './pages/auth/auth-renew/auth-renew.component';
import { AddressPipe } from './pipes/address.pipe';
import { DurationFormatPipe } from './pipes/duration-format.pipe';

@NgModule({
  declarations: [
    // diectives
    ClickOutsideDirective,
    // controls
    DropDownMenuComponent,
    PagerComponent,
    ListViewComponent,
    ListColumnComponent,
    ListTileComponent,
    SkeletonLoaderComponent,
    // shell layout
    ShellLayoutComponent,
    ShellHeaderComponent,
    ShellFooterComponent,
    // view layouts
    ViewLayoutComponent,
    SideViewLayoutComponent,
    ModelViewLayoutComponent,
    FormLayoutComponent,
    // pages (common)
    AuthCallbackComponent,
    AuthRenewComponent,
    LoggedOutComponent,
    ErrorComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    // pipes
    AddressPipe,
    DurationFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    IndiceAuthModule
  ],
  exports: [
    ClickOutsideDirective,
    DropDownMenuComponent,
    PagerComponent,
    ListViewComponent,
    ListColumnComponent,
    ListTileComponent,
    SkeletonLoaderComponent,
    ShellLayoutComponent,
    ShellHeaderComponent,
    ShellFooterComponent,
    ViewLayoutComponent,
    SideViewLayoutComponent,
    ModelViewLayoutComponent,
    FormLayoutComponent,
    AuthCallbackComponent,
    AuthRenewComponent,
    LoggedOutComponent,
    ErrorComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    AddressPipe,
    DurationFormatPipe
  ]
})
export class IndiceComponentsModule { }
