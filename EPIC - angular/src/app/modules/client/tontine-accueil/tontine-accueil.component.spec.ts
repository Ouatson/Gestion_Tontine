import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TontineAccueilComponent } from './tontine-accueil.component';

describe('TontineAccueilComponent', () => {
  let component: TontineAccueilComponent;
  let fixture: ComponentFixture<TontineAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TontineAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TontineAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
