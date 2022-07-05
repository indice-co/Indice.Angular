import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellSidebarHeaderComponent } from '../lib/layouts/shell/shell-sidebar-header/shell-sidebar-header.component';

describe('ShellSidebarHeaderComponent', () => {
  let component: ShellSidebarHeaderComponent;
  let fixture: ComponentFixture<ShellSidebarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellSidebarHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
