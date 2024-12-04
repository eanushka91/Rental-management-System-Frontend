import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPageComponent } from './rental-page.component';

describe('RentalPageComponent', () => {
  let component: RentalPageComponent;
  let fixture: ComponentFixture<RentalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
