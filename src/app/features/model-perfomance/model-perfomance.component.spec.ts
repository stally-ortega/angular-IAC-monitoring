import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPerfomanceComponent } from './model-perfomance.component';

describe('ModelPerfomanceComponent', () => {
  let component: ModelPerfomanceComponent;
  let fixture: ComponentFixture<ModelPerfomanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelPerfomanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelPerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
