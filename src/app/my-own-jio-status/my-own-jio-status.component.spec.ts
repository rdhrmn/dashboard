import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioStatusComponent } from './my-own-jio-status.component';

describe('MyOwnJioStatusComponent', () => {
  let component: MyOwnJioStatusComponent;
  let fixture: ComponentFixture<MyOwnJioStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
