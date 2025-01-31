import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBarComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle login state', () => {
    expect(component.isLoggedIn).toBeFalse();
    component.toggleLogin();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should trigger movie search', () => {
    spyOn(console, 'log');
    component.searchQuery = 'Inception';
    component.searchMovie();
    expect(console.log).toHaveBeenCalledWith('Ricerca film:', 'Inception');
  });
});
