import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display profile information', () => {
    component.userName = 'John Doe';
    component.userEmail = 'john.doe@example.com';
    component.registrationDate = '2022-01-01';
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.profile-value')).nativeElement;
    const emailElement = fixture.debugElement.query(By.css('.profile-value')).nativeElement;
    const dateElement = fixture.debugElement.query(By.css('.profile-value')).nativeElement;

    expect(nameElement.textContent).toContain('John Doe');
    expect(emailElement.textContent).toContain('john.doe@example.com');
    expect(dateElement.textContent).toContain('2022-01-01');
  });

  it('should trigger editProfile when the button is clicked', () => {
    spyOn(component, 'editProfile');
    const button = fixture.debugElement.query(By.css('.profile-button')).nativeElement;
    button.click();
    expect(component.editProfile).toHaveBeenCalled();
  });
});
