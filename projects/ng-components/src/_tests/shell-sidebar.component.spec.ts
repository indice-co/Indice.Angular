import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellSidebarComponent } from '../lib/layouts/shell/shell-sidebar/shell-sidebar.component';

describe('ShellSidebarComponent', () => {
  let component: ShellSidebarComponent;
  let fixture: ComponentFixture<ShellSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
