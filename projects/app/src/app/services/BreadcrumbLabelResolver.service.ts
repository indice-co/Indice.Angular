import { Injectable } from "@angular/core";
import { Route } from "@angular/router";
import { IBreadcrumbLabelProcessor } from "../../../../ng-components/src/lib/types";

@Injectable()
export class BreadcrumbLabelResolver implements IBreadcrumbLabelProcessor  {
    public process(route: Route): string {
        // Custom logic to process the breadcrumb label
      return `Custom: ${route?.data?.breadcrumb?.title || route.component?.name.replace('Component', '') }`;
    }
}
