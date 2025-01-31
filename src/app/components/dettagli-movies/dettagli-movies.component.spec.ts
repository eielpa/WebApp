import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettagliMoviesComponent } from './dettagli-movies.component';
import { By } from '@angular/platform-browser';

describe('DettagliMoviesComponent', () => {
  let component: DettagliMoviesComponent;
  let fixture: ComponentFixture<DettagliMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettagliMoviesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DettagliMoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie details', () => {
    component.title = 'Inception';
    component.description = 'Un film di fantascienza con sogni dentro sogni.';
    component.release_year = 2010;
    component.category_id = 1;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.movie-title')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('.movie-description')).nativeElement;
    const yearElement = fixture.debugElement.query(By.css('.movie-year')).nativeElement;
    const genreElement = fixture.debugElement.query(By.css('.movie-genre')).nativeElement;

    expect(titleElement.textContent).toContain('Inception');
    expect(descriptionElement.textContent).toContain('Un film di fantascienza con sogni dentro sogni.');
    expect(yearElement.textContent).toContain('2010');
    expect(genreElement.textContent).toContain('1');
  });
});
