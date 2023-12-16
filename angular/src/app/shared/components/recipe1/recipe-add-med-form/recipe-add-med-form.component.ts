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
  nameCurrentMedicines: any;

  constructor(
    private Renderer2: Renderer2,
    private ElementRef: ElementRef,
    public CacheService: CacheService,
    private recipeService: RecipeService
  ) { }
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
    console.log(this.results)
    this.filteredResults = this.results.filter(
      (res: any) =>
        res.name &&
        res.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
    this.showDropdown = true;
  }

  selectOption(option: any): void {
    this.searchTerm = option.name;
    this.showDropdown = false;
    this.CacheService.nestedFormValues.medicineId = option.id;
    this.nameCurrentMedicines=option.name;
  }

  medicamentsForSearch() {
    // if (this.results.length > 0) {
    //   return;
    // }

    return this.recipeService.getMedicamentsForSearch().subscribe(
      (res: any) => {
        this.results = res.medicaments;
      },
      (err) => {
        if(err.status===401){
          this.CacheService.logout();
        }else{
          console.log(err);
        }
      }
    );
  }

}
