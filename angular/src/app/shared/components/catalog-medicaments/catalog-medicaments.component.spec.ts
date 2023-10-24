import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMedicamentsComponent } from './catalog-medicaments.component';

describe('CatalogMedicamentsComponent', () => {
  let component: CatalogMedicamentsComponent;
  let fixture: ComponentFixture<CatalogMedicamentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogMedicamentsComponent]
    });
    fixture = TestBed.createComponent(CatalogMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
