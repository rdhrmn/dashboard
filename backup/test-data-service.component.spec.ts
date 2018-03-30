import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDataServiceComponent } from './test-data-service.component';

describe('TestDataServiceComponent', () => {
  let component: TestDataServiceComponent;
  let fixture: ComponentFixture<TestDataServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDataServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDataServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
