import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcommandeComponent } from './getcommande.component';

describe('GetcommandeComponent', () => {
  let component: GetcommandeComponent;
  let fixture: ComponentFixture<GetcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
