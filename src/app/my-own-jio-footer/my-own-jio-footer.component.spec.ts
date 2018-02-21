import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioFooterComponent } from './my-own-jio-footer.component';

describe('MyOwnJioFooterComponent', () => {
  let component: MyOwnJioFooterComponent;
  let fixture: ComponentFixture<MyOwnJioFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
