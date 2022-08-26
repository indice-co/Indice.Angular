import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMenuSampleComponent } from './drop-down-menu-sample.component';

describe('DropDownMenuSampleComponent', () => {
  let component: DropDownMenuSampleComponent;
  let fixture: ComponentFixture<DropDownMenuSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownMenuSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownMenuSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
