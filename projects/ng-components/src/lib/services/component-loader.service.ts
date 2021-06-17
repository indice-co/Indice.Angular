import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComponentLoaderService {
    constructor(private cfr: ComponentFactoryResolver) { }

    public loadComponent(vcr: ViewContainerRef, component: any): void {
        vcr.clear();
        const componentFactory = this.cfr.resolveComponentFactory(component);
        const componentRef = vcr.createComponent(componentFactory);
        // TL;TR Force change detection on this component, where change detection means force lifecycle hooks to run
        // In order to avoid NG0100: Expression has changed after it was checked
        // The above error is caused because the view is rendered before the lifecycle hooks are called,
        // resulting in bindind expression changes
        // A somewhat explanation here:
        // https://stackoverflow.com/questions/56427104/when-is-oninit-event-triggered-for-a-dynamically-loaded-angular-component
        componentRef.changeDetectorRef.detectChanges();
    }
}
