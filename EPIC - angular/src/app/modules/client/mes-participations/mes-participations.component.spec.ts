import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesParticipationsComponent } from './mes-participations.component';

describe('MesParticipationsComponent', () => {
  let component: MesParticipationsComponent;
  let fixture: ComponentFixture<MesParticipationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesParticipationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesParticipationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
