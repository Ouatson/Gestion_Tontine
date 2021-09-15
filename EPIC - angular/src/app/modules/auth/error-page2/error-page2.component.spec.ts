import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPage2Component } from './error-page2.component';

describe('ErrorPage2Component', () => {
  let component: ErrorPage2Component;
  let fixture: ComponentFixture<ErrorPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
