import { Component, ContentChildren, EventEmitter, forwardRef, Input, OnInit, Output, QueryList } from '@angular/core';

import { LibStepComponent, StepState } from './lib-step.component';
import { LIBSTEPPER_ACCESSOR } from '../../tokens';
import { StepperType } from './types/stepper-type';
import { StepSelectedEvent } from './types/step-selected-event';

@Component({
    selector: 'lib-stepper',
    templateUrl: './lib-stepper.component.html',
    providers: [
        { provide: LIBSTEPPER_ACCESSOR, useExisting: forwardRef(() => LibStepperComponent) }
    ]
})
export class LibStepperComponent implements OnInit {
    // Private properties.
    private _currentStepIndex: number = 0;

    constructor() { }

    /** The inner steps of the wizard. */
    @ContentChildren(LibStepComponent, { descendants: true }) public steps!: QueryList<LibStepComponent>;
    /** Emmited when a step change occurs. */
    @Output() public readonly stepChanged = new EventEmitter<StepSelectedEvent>();
    /** Indicates whether each step has to be validated before proceeding to the next. */
    @Input() public linear: boolean = false;
    /** The type of the stepper. */
    @Input() public type: StepperType = StepperType.Panels;
    public StepState = StepState;
    public StepperType = StepperType;

    /** The current wizard step. */
    public get currentStep(): LibStepComponent | undefined {
        return this.steps?.get(this._currentStepIndex);
    }

    /** The index (starting from zero) of the current wizard step. */
    public get currentStepIndex(): number {
        return this._currentStepIndex;
    }

    public ngOnInit(): void { }

    /** Proceeds to the next step, if any. */
    public goToNextStep(): void {
        // Cannot go forward.
        if (this._currentStepIndex === this.steps.length - 1) {
            return;
        }
        this.updateCurrentStepIndex(this._currentStepIndex + 1);
    }

    /** Proceeds to the previous step, if any. */
    public goToPreviousStep(): void {
        // Cannot go back.
        if (this._currentStepIndex === 0) {
            return;
        }
        this.updateCurrentStepIndex(this._currentStepIndex - 1);
    }

    public onSelectStep(selectedStep: LibStepComponent): void {
        this.updateCurrentStepIndex(selectedStep.index);
    }

    private updateCurrentStepIndex(newIndex: number): void {
        const stepsArray = this.steps.toArray();
        const currentStep = stepsArray[this.currentStepIndex];
        const shouldStop = this.linear && (
            (!currentStep.isValid && newIndex >= this.currentStepIndex) || // If current step is invalid and want to go forward, then stop.
            (currentStep.isValid && newIndex > this.currentStepIndex + 1 && stepsArray.slice(this.currentStepIndex + 1, newIndex).some(x => !x.isValid)) // If going forward (more than 1 steps), check if there are any invalid steps in between.
        );
        if (shouldStop) {
            return;
        }
        this.stepChanged.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: this.currentStepIndex,
            selectedStep: stepsArray[newIndex],
            previouslySelectedStep: currentStep
        });
        this._currentStepIndex = newIndex;
    }
}
