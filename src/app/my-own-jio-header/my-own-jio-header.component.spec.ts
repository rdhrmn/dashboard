import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnJioHeaderComponent } from './my-own-jio-header.component';

describe('MyOwnJioHeaderComponent', () => {
  let component: MyOwnJioHeaderComponent;
  let fixture: ComponentFixture<MyOwnJioHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOwnJioHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOwnJioHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
