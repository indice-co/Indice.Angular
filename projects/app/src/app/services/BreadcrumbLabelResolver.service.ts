import { Injectable } from "@angular/core";
import { BreadcrumbContext, IBreadcrumbLabelProcessor } from "../../../../ng-components/src/lib/types";
import { Observable, of } from "rxjs";

@Injectable()
export class BreadcrumbLabelResolver implements IBreadcrumbLabelProcessor  {

  constructor() {
  }
    public process(context: BreadcrumbContext): string | Observable<string> {
      // Custom logic to process the breadcrumb label
      // Right now the route snapshot is undefined, so we use the route data
      return of(`${context.route?.data?.breadcrumb?.title || context.route?.component?.name.replace('Component', '')}`);
    }
}
