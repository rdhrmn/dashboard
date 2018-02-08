import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioTibcoComponent } from './my-own-jio-tibco.component';

describe('MyOwnJioTibcoComponent', () => {
  let component: MyOwnJioTibcoComponent;
  let fixture: ComponentFixture<MyOwnJioTibcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioTibcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioTibcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
