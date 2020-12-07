import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSpendModalComponent } from './total-spend-modal.component';

describe('RecurringTranModalComponent', () => {
  let component: TotalSpendModalComponent;
  let fixture: ComponentFixture<TotalSpendModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSpendModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSpendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
