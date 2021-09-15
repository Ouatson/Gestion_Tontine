import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTontinesComponent } from './mes-tontines.component';

describe('MesTontinesComponent', () => {
  let component: MesTontinesComponent;
  let fixture: ComponentFixture<MesTontinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesTontinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesTontinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
