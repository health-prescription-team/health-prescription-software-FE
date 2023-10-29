import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicamentComponent } from './add-medicament.component';

describe('AddMedicamentComponent', () => {
  let component: AddMedicamentComponent;
  let fixture: ComponentFixture<AddMedicamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMedicamentComponent]
    });
    fixture = TestBed.createComponent(AddMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
