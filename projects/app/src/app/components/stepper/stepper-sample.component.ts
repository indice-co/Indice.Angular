import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { StepSelectedEvent } from 'projects/ng-components/src/lib/controls/stepper/types/step-selected-event';
import { StepperType } from 'projects/ng-components/src/lib/controls/stepper/types/stepper-type';

@Component({
    selector: 'app-sample-stepper',
    templateUrl: './stepper-sample.component.html'
})
export class SampleStepperComponent implements OnInit {
    public ngOnInit(): void { }

    public selectedStepperType: StepperType = StepperType.PanelsWithBorder;
    public stepperType = StepperType;
    public contentForm: FormGroup = new FormGroup({
        description: new FormControl(undefined, [
            Validators.required,
            Validators.maxLength(512)
        ])
    });
    public get description(): AbstractControl {
        return this.contentForm.get('description')!;
    }

    public onStepperStepChanged(selectedStep: StepSelectedEvent): void {
        console.log('Selected step is:');
        console.log(selectedStep);
    }

    public onStepperTypeChange($event: any): void { 
        this.selectedStepperType = $event.currentTarget.value;
    }
}
