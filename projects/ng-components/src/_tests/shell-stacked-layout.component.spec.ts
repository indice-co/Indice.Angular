import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellStackedLayoutComponent } from '../lib/layouts/shell/shell-stacked-layout/shell-stacked-layout.component';

describe('ShellStackedLayoutComponent', () => {
  let component: ShellStackedLayoutComponent;
  let fixture: ComponentFixture<ShellStackedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellStackedLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellStackedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
