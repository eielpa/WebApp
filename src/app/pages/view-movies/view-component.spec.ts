import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMoviesComponent } from './view-movies.component';
import { By } from '@angular/platform-browser';

describe('ViewMoviesComponent', () => {
  let component: ViewMoviesComponent;
  let fixture: ComponentFixture<ViewMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMoviesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie details', () => {
    component.movies = [
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        description: 'A mind-bending thriller.',
        rating: 9,
        poster: 'path/to/inception.jpg'
      }
    ];
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.view-movie-title')).nativeElement;
    const directorElement = fixture.debugElement.query(By.css('.view-movie-director')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('.view-movie-description')).nativeElement;
    const ratingElement = fixture.debugElement.query(By.css('.view-movie-rating')).nativeElement;

    expect(titleElement.textContent).toContain('Inception');
    expect(directorElement.textContent).toContain('Christopher Nolan');
    expect(descriptionElement.textContent).toContain('A mind-bending thriller.');
    expect(ratingElement.textContent).toContain('9');
  });
});
