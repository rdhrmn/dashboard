import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioHomeComponent } from './my-own-jio-home.component';

describe('MyOwnJioHomeComponent', () => {
  let component: MyOwnJioHomeComponent;
  let fixture: ComponentFixture<MyOwnJioHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
