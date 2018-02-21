import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioHighlightsComponent } from './my-own-jio-highlights.component';

describe('MyOwnJioHighlightsComponent', () => {
  let component: MyOwnJioHighlightsComponent;
  let fixture: ComponentFixture<MyOwnJioHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
