import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviecardfilmhomeComponent } from './moviecardfilmhome.component';

describe('MoviecardfilmhomeComponent', () => {
  let component: MoviecardfilmhomeComponent;
  let fixture: ComponentFixture<MoviecardfilmhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviecardfilmhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviecardfilmhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
