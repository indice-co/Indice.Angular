import { Inject, Injectable, Optional } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

import { SHELL_CONFIG } from '@indice/ng-components';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { BreadcrumbItem } from '../controls/breadcrumb/breadcrumb-item';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private _defaultHome: BreadcrumbItem | undefined;
    private _breadcrumb$: Subject<BreadcrumbItem[]> = new Subject<BreadcrumbItem[]>();

    constructor(
        private _router: Router,
        private _utilities: UtilitiesService,
        @Optional() @Inject(SHELL_CONFIG) public _shellConfig?: any
    ) {
        if (_shellConfig?.breadcrumb) {
            this._defaultHome = this._getDefaultHomeItem();
            this._router
                .events
                .pipe(
                    filter(event => event instanceof NavigationEnd),
                    distinctUntilChanged()
                )
                .subscribe(_ => {
                    const breadcrumb = [...this._buildBreadcrumb()];
                    this._breadcrumb$.next(breadcrumb);
                });
        }
    }

    public breadcrumb: Observable<BreadcrumbItem[]> = this._breadcrumb$.asObservable();

    private _buildBreadcrumb(): BreadcrumbItem[] {
        const breadcrumb: BreadcrumbItem[] = [];
        if (this._defaultHome) {
            breadcrumb.push(this._defaultHome);
        }
        const url = this._router.url;
        const path = this._utilities.getPathFromUrl(url) || '';
        const activeRoute = this._findActiveRoute(path);
        const parentRoutes = this._findParentRoutes(activeRoute);
        breadcrumb.push(...parentRoutes);
        if (activeRoute && activeRoute?.path !== this._defaultHome?.url) {
            breadcrumb.push(new BreadcrumbItem(this._getRouteTitle(activeRoute), activeRoute.path || ''));
        }
        return breadcrumb;
    }

    private _findActiveRoute(url: string): Route | undefined {
        const urlSegments = url.split('/').filter((segment: string) => segment !== '');
        const routerConfig = this._router.config;
        return routerConfig
            .filter((route: Route) => route.path?.split('/').length === urlSegments.length)
            .find((route: Route) => {
                const routeSegments = route.path?.split('/') || [];
                let segmentsMatched = false;
                for (let i = 0; i < routeSegments.length; i++) {
                    const currentSegment = routeSegments[i];
                    const isDynamicSegment = currentSegment.startsWith(':');
                    if (!isDynamicSegment) {
                        segmentsMatched = currentSegment === urlSegments[i];
                    }
                }
                return segmentsMatched ? route : undefined;
            });
    }

    private _findParentRoutes(activeRoute: Route | undefined, items: BreadcrumbItem[] = []): BreadcrumbItem[] {
        if (!activeRoute) {
            return [];
        }
        let urlSegments = activeRoute.path?.split('/').filter((segment: string) => segment !== '') || [];
        if (urlSegments?.length <= 1) {
            return [...items];
        }
        const previousUrl = urlSegments.slice(0, -1).join('/');
        const route = this._findActiveRoute(previousUrl);
        if (route) {
            items.push(new BreadcrumbItem(this._getRouteTitle(route), route.path || ''));
            this._findParentRoutes(route, [...items]);
        }
        return [...items];
    }

    private _getDefaultHomeItem(): BreadcrumbItem | undefined {
        const routerConfig = this._router.config;
        const declaredHomeRoutes = routerConfig.filter((route: Route) => route.data?.breadcrumb?.isHome === true);
        if (declaredHomeRoutes.length > 1) {
            throw new Error('You can declare only one route as home.');
        }
        let homeRoute: Route | undefined;
        if (declaredHomeRoutes.length === 1) {
            homeRoute = declaredHomeRoutes[0];
        } else {
            homeRoute = routerConfig.find((route: Route) => route.path === '');
            if (!homeRoute) {
                return undefined;
            }
            const redirectionUrl = homeRoute.redirectTo;
            if (!homeRoute?.data?.breadcrumb?.title && redirectionUrl) {
                homeRoute = routerConfig.find((route: Route) => route.path === redirectionUrl);
                if (!homeRoute) {
                    return undefined;
                }
            }
        }
        return new BreadcrumbItem(this._getRouteTitle(homeRoute), homeRoute.path || '');
    }

    private _getRouteTitle(route: Route) {
        return route?.data?.breadcrumb?.title || route.component?.name.replace('Component', '');
    }
}
