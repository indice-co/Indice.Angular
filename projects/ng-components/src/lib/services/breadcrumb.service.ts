import { Inject, Injectable, Optional } from '@angular/core';
import { Data, NavigationEnd, Route, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { BreadcrumbItem } from '../controls/breadcrumb/breadcrumb-item';
import { SHELL_CONFIG } from '../tokens';
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

    private _buildBreadcrumb(): BreadcrumbItem[] {
        const breadcrumb: BreadcrumbItem[] = [];
        if (this._defaultHome) {
            breadcrumb.push(this._defaultHome);
        }
        const url = this._router.url;
        const path = this._utilities.getPathFromUrl(url) || '';
        const activeRoute = this._findRouteFromUrl(path);
        const parentRoutes = this._findParentRoutes(activeRoute);
        breadcrumb.push(...parentRoutes);
        if (activeRoute && activeRoute?.path !== this._defaultHome?.url) {
            const routeData = this._getBreadcrumbRouteData(activeRoute);
            breadcrumb.push(new BreadcrumbItem(this._getRouteTitle(activeRoute), (routeData._fullPath || activeRoute.path || '')));
        }
        return breadcrumb.map((route: BreadcrumbItem) => {
            const routeSegments = route.url?.split('/') || [];
            routeSegments.forEach((segment: string, index: number) => {
              if (segment.startsWith(':')) {
                const dynamicValue = url.split('/')[index + 1];
                route.url = route.url?.replace(segment, dynamicValue);
                if (segment == ":caseTypeCode") {
                  route.title = dynamicValue;
                }
              }
            });
            return route;
        });
    }

    private _findRouteFromUrl(url: string): Route | undefined {
        const urlSegments = url.split('/').filter((segment: string) => segment !== '');
        const routerConfig = this._router.config;
        const flattenedRouterConfig = this._flattenRoutes(routerConfig);
        const filteredRouterConfig = flattenedRouterConfig.filter((route: Route) => {
            const routeData = this._getBreadcrumbRouteData(route);
            return (routeData._fullPath || route.path)?.split('/').length === urlSegments.length;
        });
        const route = filteredRouterConfig.find((route: Route) => {
            const routeData = this._getBreadcrumbRouteData(route);
            const routeSegments = (routeData._fullPath || route.path)?.split('/') || [];
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
        return route;
    }

    private _findParentRoutes(activeRoute: Route | undefined, items: BreadcrumbItem[] = []): BreadcrumbItem[] {
        if (!activeRoute) {
            return [];
        }
        const routeData = this._getBreadcrumbRouteData(activeRoute);
        let urlSegments = (routeData._fullPath || activeRoute.path)?.split('/').filter((segment: string) => segment !== '') || [];
        if (urlSegments?.length <= 1) {
            return [...items];
        }
        const previousUrl = urlSegments.slice(0, -1).join('/');
        const route = this._findRouteFromUrl(previousUrl);
        if (route) {
            const routeData = this._getBreadcrumbRouteData(route);
            if (routeData._level > 0 || (!route.children || route.children.length === 0)) {
                items.push(new BreadcrumbItem(this._getRouteTitle(route), routeData._fullPath || route.path));
                this._findParentRoutes(route, [...items]);
            }
        }
        return [...items];
    }

    private _flattenRoutes(routes: Route[], level?: number): Route[] {
        let children: Route[] = [];
        level = level || 0;
        return routes.map((route: Route) => {
            const routeData = this._getBreadcrumbRouteData(route);
            routeData._level = level!;
            if (route.children && route.children.length) {
                route.children.forEach((child: Route) => {
                    const childRouteData = this._getBreadcrumbRouteData(child);
                    const routePath = routeData._fullPath || route.path || '';
                    const childPath = child.path?.endsWith('/') ? child.path.slice(0, -1) : child.path;
                    childRouteData._fullPath = childPath?.indexOf(routePath) === -1 ? `${routePath}/${childPath}` : childPath;
                });
                children = [...children, ...route.children];
            }
            return route;
        }).concat(children.length ? this._flattenRoutes(children, level + 1) : children);
    }

    private _getBreadcrumbRouteData(route: Route | undefined): BreadcrumbRouteData {
        if (!route) {
            throw new Error('No route was found');
        }
        if (!route.data?.breadcrumb) {
            if (!route.data) {
                route.data = {};
            }
            route.data.breadcrumb = new BreadcrumbRouteData(0, false, undefined);
        }
        return route.data.breadcrumb;
    }
}

export class BreadcrumbRouteData {
    constructor(public _level: number, public isHome: boolean, public _fullPath?: string | undefined) { }
}
