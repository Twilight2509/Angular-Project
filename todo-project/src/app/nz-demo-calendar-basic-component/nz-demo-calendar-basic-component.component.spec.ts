import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoCalendarBasicComponentComponent } from './nz-demo-calendar-basic-component.component';

describe('NzDemoCalendarBasicComponentComponent', () => {
  let component: NzDemoCalendarBasicComponentComponent;
  let fixture: ComponentFixture<NzDemoCalendarBasicComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoCalendarBasicComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoCalendarBasicComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
