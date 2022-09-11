import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButtonsListSampleComponent } from '../components/toggle-buttons-list-sample/toggle-buttons-list-sample.component';

describe('ToggleButtonsListSampleComponent', () => {
  let component: ToggleButtonsListSampleComponent;
  let fixture: ComponentFixture<ToggleButtonsListSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleButtonsListSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleButtonsListSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
