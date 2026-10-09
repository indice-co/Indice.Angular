import { ChangeDetectionStrategy, Component, ContentChild, Inject, Optional, Signal, TemplateRef, ViewEncapsulation, input, viewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { LIBSTEPPER_ACCESSOR } from '../../tokens';
import { LibStepInfoDirective } from './lib-step-info.directive';
import { LibStepLabelDirective } from './lib-step-label.directive';

export enum StepState {
    Active = 'Active',
    Completed = 'Completed',
    Upcoming = 'Upcoming'
};

@Component({
    selector: 'lib-step',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibStepComponent {
    constructor(
        @Optional() @Inject(LIBSTEPPER_ACCESSOR) public readonly _stepper?: ILibStepperAccessor
    ) { }

    /** The content provided for the step. */
    public readonly content = viewChild.required(TemplateRef);
    /** The label of the step displayed in header, if applicable. */
    @ContentChild(LibStepLabelDirective) public stepLabel: LibStepLabelDirective | undefined;
    /** The info of the step displayed in header, if applicable. */
    @ContentChild(LibStepInfoDirective) public stepInfo: LibStepInfoDirective | undefined;
    /** An optional CSS class for the step header. */
    public readonly class = input<string>();
    /** The abstract control of the step. */
    public readonly stepControl = input<AbstractControl>();

    /** Indicates the index of the step. */
    public get index(): number {
        return this._stepper ? this._stepper.steps().indexOf(this) : -1;
    }

    /** Indicates whether this step is the last step. */
    public get isLast(): boolean {
        return this._stepper ? this._stepper.steps().length - 1 === this.index : false;
    }

    /** Indicates whether you can navigate to the step or not. */
    public get isValid(): boolean {
        const stepControl = this.stepControl();
        if (!stepControl) {
            return true;
        }
        return stepControl.valid;
    }

    /** Shows the current state of the step. */
    public get state(): StepState {
        const currentIndex = this._stepper?.currentStepIndex;
        if (currentIndex === undefined) {
            return StepState.Upcoming;
        }
        if (currentIndex === this.index) {
            return StepState.Active;
        }
        if (currentIndex > this.index) {
            return StepState.Completed;
        }
        return StepState.Upcoming;
    }
}

/** Minimal shape of the parent stepper that a step reads (typed here to avoid a circular import). */
export interface ILibStepperAccessor {
    readonly steps: Signal<readonly LibStepComponent[]>;
    readonly currentStepIndex: number;
}
