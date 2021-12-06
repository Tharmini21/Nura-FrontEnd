import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitylistComponent } from './opportunitylist.component';

describe('OpportunitylistComponent', () => {
  let component: OpportunitylistComponent;
  let fixture: ComponentFixture<OpportunitylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunitylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
