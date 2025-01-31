import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesCardComponent } from './movies-card.component';
import { By } from '@angular/platform-browser';

describe('MoviesCardComponent', () => {
  let component: MoviesCardComponent;
  let fixture: ComponentFixture<MoviesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and director', () => {
    component.title = 'Inception';
    component.director = 'Christopher Nolan';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.movie-title')).nativeElement;
    const directorElement = fixture.debugElement.query(By.css('.movie-director')).nativeElement;

    expect(titleElement.textContent).toContain('Inception');
    expect(directorElement.textContent).toContain('Christopher Nolan');
  });
});
