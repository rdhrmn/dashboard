import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioTibcoTasksComponent } from './my-own-jio-tibco-tasks.component';

describe('MyOwnJioTibcoTasksComponent', () => {
  let component: MyOwnJioTibcoTasksComponent;
  let fixture: ComponentFixture<MyOwnJioTibcoTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioTibcoTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioTibcoTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
