import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioTibcoopsdataComponent } from './my-own-jio-tibcoopsdata.component';

describe('MyOwnJioTibcoopsdataComponent', () => {
  let component: MyOwnJioTibcoopsdataComponent;
  let fixture: ComponentFixture<MyOwnJioTibcoopsdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioTibcoopsdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioTibcoopsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
