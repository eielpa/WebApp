import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsComponent } from './reviews.component';
import { By } from '@angular/platform-browser';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of reviews', () => {
    component.reviews = [
      { title: 'Inception', content: 'Amazing movie!', rating: 9 },
      { title: 'The Dark Knight', content: 'Best superhero film!', rating: 10 }
    ];
    fixture.detectChanges();

    const reviewElements = fixture.debugElement.queryAll(By.css('.review-card'));
    expect(reviewElements.length).toBe(2);

    const firstReview = reviewElements[0].nativeElement;
    expect(firstReview.querySelector('h3').textContent).toContain('Inception');
    expect(firstReview.querySelector('.review-rating').textContent).toContain('9');
  });

  it('should trigger addReview when the button is clicked', () => {
    spyOn(component, 'addReview');
    const button = fixture.debugElement.query(By.css('.review-button')).nativeElement;
    button.click();
    expect(component.addReview).toHaveBeenCalled();
  });
});
