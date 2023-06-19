import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewLayoutSampleComponent } from './model-view-layout-sample.component';

describe('ModelViewLayoutSampleComponent', () => {
  let component: ModelViewLayoutSampleComponent;
  let fixture: ComponentFixture<ModelViewLayoutSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelViewLayoutSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelViewLayoutSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
