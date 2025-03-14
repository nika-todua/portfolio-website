import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilefactsComponent } from './profilefacts.component';

describe('ProfilefactsComponent', () => {
  let component: ProfilefactsComponent;
  let fixture: ComponentFixture<ProfilefactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilefactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilefactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
