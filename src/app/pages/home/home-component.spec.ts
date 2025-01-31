import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home-component';
import { By } from '@angular/platform-browser';
import { MoviesCardComponent } from '../../components/movies-card/movies-card.component';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, MoviesCardComponent], // Importa MoviesCardComponent
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome message', () => {
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(titleElement.textContent).toContain('Benvenuto su MovieMarket');
    expect(descriptionElement.textContent).toContain('Scopri i migliori film, leggi recensioni e esplora nuove uscite!');
  });

  it('should display recommended movies', () => {
    fixture.detectChanges();

    const movieCards = fixture.debugElement.queryAll(By.css('app-movies-card'));
    expect(movieCards.length).toBe(component.recommendedMovies.length);

    const firstMovieCard = movieCards[0].nativeElement;
    expect(firstMovieCard.textContent).toContain(component.recommendedMovies[0].title);
    expect(firstMovieCard.textContent).toContain(component.recommendedMovies[0].description);
  });
});
