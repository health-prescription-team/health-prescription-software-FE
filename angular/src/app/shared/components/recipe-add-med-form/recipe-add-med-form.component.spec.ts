import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAddMedFormComponent } from './recipe-add-med-form.component';

describe('RecipeAddMedFormComponent', () => {
  let component: RecipeAddMedFormComponent;
  let fixture: ComponentFixture<RecipeAddMedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeAddMedFormComponent]
    });
    fixture = TestBed.createComponent(RecipeAddMedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
