import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesParticipationsComponent } from './demandes-participations.component';

describe('DemandesParticipationsComponent', () => {
  let component: DemandesParticipationsComponent;
  let fixture: ComponentFixture<DemandesParticipationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandesParticipationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesParticipationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
