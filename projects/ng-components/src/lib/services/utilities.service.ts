import { Injectable } from '@angular/core';
import { IValidationProblemDetails } from '../types';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor() { }

  public problemDetails?: IValidationProblemDetails;

  public get validationErrors(): string[] {
    const messages: string[] = [];
    const errors = this.problemDetails && this.problemDetails.errors;
    for (const property in errors) {
      if (property) {
        const propertyMessages = errors[property];
        propertyMessages.forEach((message: string) => {
          messages.push(message);
        });
      } else {
        Object.values(errors || {}).forEach(message => {
          message.forEach(x => {
            messages.push(x);
          });
        });
      }
    }
    return messages;
  }

  public getValidationProblemDetails(problemDetails: IValidationProblemDetails): string[] {
    this.problemDetails = problemDetails;
    if (this.validationErrors.length === 0 && this.problemDetails.title) {
      return new Array<string>(1).fill(this.problemDetails.title);
    }
    return this.validationErrors;
  }
}
