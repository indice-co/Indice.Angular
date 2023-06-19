import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButtonSampleComponent } from './toggle-button-sample.component';

describe('ToggleButtonSampleComponent', () => {
  let component: ToggleButtonSampleComponent;
  let fixture: ComponentFixture<ToggleButtonSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleButtonSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleButtonSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
