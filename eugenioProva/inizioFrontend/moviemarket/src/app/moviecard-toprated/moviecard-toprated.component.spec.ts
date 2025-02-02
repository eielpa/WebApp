import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviecardTopratedComponent } from './moviecard-toprated.component';

describe('MoviecardTopratedComponent', () => {
  let component: MoviecardTopratedComponent;
  let fixture: ComponentFixture<MoviecardTopratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviecardTopratedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviecardTopratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
