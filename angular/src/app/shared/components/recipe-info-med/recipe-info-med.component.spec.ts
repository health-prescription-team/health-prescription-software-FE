import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInfoMedComponent } from './recipe-info-med.component';

describe('RecipeInfoMedComponent', () => {
  let component: RecipeInfoMedComponent;
  let fixture: ComponentFixture<RecipeInfoMedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeInfoMedComponent]
    });
    fixture = TestBed.createComponent(RecipeInfoMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
