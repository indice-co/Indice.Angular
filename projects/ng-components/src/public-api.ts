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
export * from './lib/controls/list-view/list-view-empty-state.component';
export * from './lib/controls/skeleton-loader/skeleton-loader.component';
export * from './lib/controls/collapsible-panel/collapsible-panel.component';
export * from './lib/controls/kpi-tile/kpi-tile.component';
export * from './lib/controls/date-picker/date-picker.component';
export * from './lib/controls/toaster/toaster-container.component';
export * from './lib/controls/toaster/toaster.component';
export * from './lib/controls/avatar-initials/avatar-initials.component';
export * from './lib/controls/toggle/toggle.component';
export * from './lib/controls/side-pane/side-pane.component';

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

// services
export * from './lib/services/component-loader/component-loader.factory';
export * from './lib/services/modal-service/modal-service';
export { ModalOptions, MODAL_CONFIG_DEFAULT_OVERRIDE, CloseInterceptorFn } from './lib/services/modal-service/modal-options.class';
export * from './lib/services/modal-service/modal.class';
export * from './lib/services/toaster.service';

export * from './lib/ng-components.module';
