import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellLayoutTemplateComponent } from '../lib/layouts/shell/shell-layout/shell-layout-template/shell-layout-template.component';

describe('ShellLayoutTemplateComponent', () => {
  let component: ShellLayoutTemplateComponent;
  let fixture: ComponentFixture<ShellLayoutTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellLayoutTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellLayoutTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
