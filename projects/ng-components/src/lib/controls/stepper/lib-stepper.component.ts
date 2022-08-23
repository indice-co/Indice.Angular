import { AfterViewChecked, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, Input, OnInit, Output, QueryList } from '@angular/core';

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
export class LibStepperComponent implements OnInit, AfterViewChecked {
    // Private properties.
    private _currentStepIndex: number = 0;
    private _isCompleted = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    /** The inner steps of the wizard. */
    @ContentChildren(LibStepComponent, { descendants: true }) public steps!: QueryList<LibStepComponent>;
    /** Emmited when a step change occurs. */
    @Output() public readonly stepChanged = new EventEmitter<StepSelectedEvent>();
    /** Emmited when the stepper navigates away from the final step. Only emits once. */
    @Output() public readonly completed = new EventEmitter<void>();
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

    /** Indicates whether stepper can go a step back. */
    public get canGoBack(): boolean {
        return this._currentStepIndex > 0;
    }

    /** Indicates whether stepper can go a step forward. */
    public get canGoForward(): boolean {
        return this._currentStepIndex < this.steps?.length - 1;
    }

    /** Indicates whether  */
    public get isCompleted(): boolean {
        return this._isCompleted;
    }

    public ngOnInit(): void { }

    public ngAfterViewChecked(): void {
        this._changeDetectorRef.detectChanges();
    }

    /** Proceeds to the next step, if any. */
    public goToNextStep(): void {
        if (this.currentStep?.isLast && !this._isCompleted) {
            this._isCompleted = true;
            this.completed.emit();
        }
        if (!this.canGoForward) {
            return;
        }
        this.updateCurrentStepIndex(this._currentStepIndex + 1);
    }

    /** Proceeds to the previous step, if any. */
    public goToPreviousStep(): void {
        if (!this.canGoBack) {
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
