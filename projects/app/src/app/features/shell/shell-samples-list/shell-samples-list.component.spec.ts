/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShellSamplesListComponent } from './shell-samples-list.component';

describe('ShellSamplesListComponent', () => {
  let component: ShellSamplesListComponent;
  let fixture: ComponentFixture<ShellSamplesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellSamplesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellSamplesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
