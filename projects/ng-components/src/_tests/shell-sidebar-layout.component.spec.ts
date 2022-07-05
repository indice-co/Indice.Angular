import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellSidebarLayoutComponent } from '../lib/layouts/shell/shell-sidebar-layout/shell-sidebar-layout.component';

describe('ShellSidebarLayoutComponent', () => {
  let component: ShellSidebarLayoutComponent;
  let fixture: ComponentFixture<ShellSidebarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellSidebarLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
