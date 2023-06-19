import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButtonsListComponent } from './toggle-buttons-list.component';

describe('ToggleButtonsListComponent', () => {
  let component: ToggleButtonsListComponent;
  let fixture: ComponentFixture<ToggleButtonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleButtonsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleButtonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
