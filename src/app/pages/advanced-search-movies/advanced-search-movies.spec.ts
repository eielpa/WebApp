import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvancedSearchMoviesComponent } from './advanced-search-movies.component';
import { By } from '@angular/platform-browser';

describe('AdvancedSearchMoviesComponent', () => {
  let component: AdvancedSearchMoviesComponent;
  let fixture: ComponentFixture<AdvancedSearchMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSearchMoviesComponent]  // Importa il componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedSearchMoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchMovies when input changes and button is clicked', () => {
    spyOn(component, 'searchMovies');  // Spia la funzione searchMovies

    // Simula l'inserimento di un valore nell'input
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Inception';
    input.dispatchEvent(new Event('input'));  // Simula l'evento input

    // Simula il click del bottone
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    fixture.detectChanges();

    expect(component.searchMovies).toHaveBeenCalled();  // Verifica che searchMovies sia stato chiamato
  });

  it('should call searchMovies when Enter is pressed in the input', () => {
    spyOn(component, 'searchMovies');  // Spia la funzione searchMovies

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Inception';
    input.dispatchEvent(new Event('input'));  // Simula l'input

    // Simula la pressione di Enter
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    input.dispatchEvent(event);

    fixture.detectChanges();

    expect(component.searchMovies).toHaveBeenCalled();  // Verifica che searchMovies sia stato chiamato
  });
});
