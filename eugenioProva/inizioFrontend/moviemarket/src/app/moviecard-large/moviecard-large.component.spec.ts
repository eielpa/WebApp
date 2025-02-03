import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviecardLargeComponent } from './moviecard-large.component';

describe('MoviecardLargeComponent', () => {
  let component: MoviecardLargeComponent;
  let fixture: ComponentFixture<MoviecardLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviecardLargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviecardLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
