import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComponentLoaderService {
    constructor(private cfr: ComponentFactoryResolver) { }

    loadComponent(vcr: ViewContainerRef, component: any){
        vcr.clear();
        let componentFactory = this.cfr.resolveComponentFactory(component);
        vcr.createComponent(componentFactory);
    }
}