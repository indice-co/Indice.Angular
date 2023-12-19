import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTileComponent } from '../lib/controls/content-tile/content-tile.component';

describe('ContentTileComponent', () => {
  let component: ContentTileComponent;
  let fixture: ComponentFixture<ContentTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
