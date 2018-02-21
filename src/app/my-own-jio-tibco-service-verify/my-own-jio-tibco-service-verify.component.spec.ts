import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioTibcoServiceVerifyComponent } from './my-own-jio-tibco-service-verify.component';

describe('MyOwnJioTibcoServiceVerifyComponent', () => {
  let component: MyOwnJioTibcoServiceVerifyComponent;
  let fixture: ComponentFixture<MyOwnJioTibcoServiceVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioTibcoServiceVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioTibcoServiceVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
