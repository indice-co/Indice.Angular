/*
 * Public API Surface of @indice/ng-components
 */

// directives
export * from './lib/directives/click-outside.directive';

// controls
export * from './lib/controls/drop-down-menu/drop-down-menu.component';
export * from './lib/controls/pager/pager.component';
export * from './lib/controls/list-view/list-view.component';
export * from './lib/controls/list-view/list-column.component';
export * from './lib/controls/list-view/list-tile.component';
export * from './lib/controls/list-view/list-details-section.component';
export * from './lib/controls/skeleton-loader/skeleton-loader.component';
export * from './lib/controls/collapsible-panel/collapsible-panel.component';
export * from './lib/controls/kpi-tile/kpi-tile.component';

// shell layout
export * from './lib/layouts/shell/shell-layout/shell-layout.component';
export * from './lib/layouts/shell/shell-header/shell-header.component';
export * from './lib/layouts/shell/shell-footer/shell-footer.component';

// view layouts
export * from './lib/layouts/views/view-layout/view-layout.component';
export * from './lib/layouts/views/model-view-layout/model-view-layout.component';
export * from './lib/layouts/views/side-view-layout/side-view-layout.component';
export * from './lib/layouts/views/form-layout/form-layout.component';

// pages
export * from './lib/pages/auth/auth-callback/auth-callback.component';
export * from './lib/pages/auth/auth-renew/auth-renew.component';
export * from './lib/pages/auth/logged-out/logged-out.component';
export * from './lib/pages/http-status/error/error.component';
export * from './lib/pages/http-status/page-not-found/page-not-found.component';
export * from './lib/pages/http-status/unauthorized/unauthorized.component';

// pipes
export * from './lib/pipes/address.pipe';
export * from './lib/pipes/duration-format.pipe';

// common stuff (tokens, types, helper classes)
export * from './lib/tokens';
export * from './lib/types';
export * from './lib/icons';
export * from './lib/helpers/base-list.component';

export * from './lib/ng-components.module';
