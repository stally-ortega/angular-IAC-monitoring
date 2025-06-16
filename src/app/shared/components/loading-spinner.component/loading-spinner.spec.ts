import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemedSpinner } from './themed-spinner';

describe('ThemedSpinner', () => {
  let component: ThemedSpinner;
  let fixture: ComponentFixture<ThemedSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemedSpinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemedSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
