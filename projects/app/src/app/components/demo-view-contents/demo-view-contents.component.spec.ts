import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoViewContentsComponent } from './demo-view-contents.component';

describe('DemoViewContentsComponent', () => {
  let component: DemoViewContentsComponent;
  let fixture: ComponentFixture<DemoViewContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoViewContentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoViewContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
