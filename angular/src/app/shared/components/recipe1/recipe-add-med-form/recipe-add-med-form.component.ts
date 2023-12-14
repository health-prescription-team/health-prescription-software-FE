import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-add-med-form',
  templateUrl: './recipe-add-med-form.component.html',
  styleUrls: ['./recipe-add-med-form.component.css'],
})
export class RecipeAddMedFormComponent implements AfterViewInit {
  selectedMedicine: string = '';

  @ViewChild('inputselectMedInput') inputselectMedInput!: NgModel;
  @ViewChild('inputmorning') inputmorning!: NgModel;
  @ViewChild('inputadditionalInfo') inputadditionalInfo!: NgModel;
  @ViewChild('inputmidday') inputmidday!: NgModel;
  @ViewChild('inputevening') inputevening!: NgModel;
  @Output('nestedFormValues') customEvent = new EventEmitter<object>();

  currentmedicine: any = '';
  filteredResults: any;
  searchTerm: any;
  showDropdown: boolean = false;
  results: any;

  constructor(
    private Renderer2: Renderer2,
    private ElementRef: ElementRef,
    public CacheService: CacheService,
    private recipeService: RecipeService
  ) {
    this.medicamentsForSearch();
    console.log(this.results);
  }
  clearAllFields() {}

  emit() {
    this.currentmedicine = {
      med: this.selectedMedicine,
      morning: this.inputmorning.value,
      midday: this.inputmidday.value,
      evening: this.inputevening.value,
      additionalInfo: this.inputadditionalInfo.value,
    };
    this.customEvent.emit(this.currentmedicine);
  }
  ngAfterViewInit() {
    this.setStyles();
    this.medicamentsForSearch();
  }
  searchHandler(seacrchWord: any) {
    console.log(seacrchWord.value);
  }
  setStyles() {
    this.Renderer2.setStyle(this.ElementRef.nativeElement, 'display', 'flex');
    this.Renderer2.setStyle(
      this.ElementRef.nativeElement,
      'justify-content',
      'center'
    );
  }

  filterResults(): void {
    this.filteredResults = this.results.filter(
      (res:any) =>
        res.medicament &&
        res.medicament.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.showDropdown = true;
  }

  selectOption(option: any): void {
    this.searchTerm = option.medicament;
    this.showDropdown = false;
    console.log('id', option.id);
    this.CacheService.nestedFormValues.medicineId = option.id;
  }

  medicamentsForSearch() {
    // if (this.results.length > 0) {
    //   return;
    // }

    return this.recipeService.getMedicamentsForSearch().subscribe(
      (res) => {
        res = this.results;
        console.log('res', res);
      },
      (err) => {
        console.log(err);
      }
    );
 
   }
}
