import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoViewFormComponent } from './demo-view-form.component';

describe('DemoViewFormComponent', () => {
  let component: DemoViewFormComponent;
  let fixture: ComponentFixture<DemoViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoViewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
