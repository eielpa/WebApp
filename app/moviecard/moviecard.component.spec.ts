import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviecardComponent } from './moviecard.component';

describe('MoviecardComponent', () => {
  let component: MoviecardComponent;
  let fixture: ComponentFixture<MoviecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviecardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
