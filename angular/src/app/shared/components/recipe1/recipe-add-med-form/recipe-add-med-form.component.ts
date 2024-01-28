import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CacheService } from 'src/app/shared/services/cache.service';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import {CurrentMedicine, DynamicSearchMedicament} from "../../../interfaces";

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

  @Input('recipeId') recipeId!: string;
  @Input('isEditRecipe') isEditRecipe!: boolean;
  @Input('role') role!: string;

  currentmedicine!: CurrentMedicine ;

  showDropdown: boolean = true;

  isDropdownError: boolean = false;



  constructor(
    private Renderer2: Renderer2,
    private ElementRef: ElementRef,
    public CacheService: CacheService,
    private recipeService: RecipeService,
    private toastr:ToastrService
  ) {}
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
    this.CacheService.isCanceled=false
  }
  ngAfterViewInit() {
    this.setStyles();
    this.medicamentsForSearch();
  }
  searchHandler(seacrchWord: any) {}
  setStyles() {
    this.Renderer2.setStyle(this.ElementRef.nativeElement, 'display', 'flex');
    this.Renderer2.setStyle(
      this.ElementRef.nativeElement,
      'justify-content',
      'center'
    );
  }

  filterResults(): void {
    if (this.CacheService.searchTerm) {
      this.CacheService.filteredResults = this.CacheService.results.filter(
        (res:DynamicSearchMedicament) =>
          res.name &&
          res.name.toLowerCase().startsWith(this.CacheService.searchTerm?.toLowerCase())
      );
    } else {
      this.CacheService.filteredResults = [...this.CacheService.results];
    }
    setTimeout(() => {
      this.showDropdown = true;
    }, 0);
  }

  selectOption(option: DynamicSearchMedicament): void {
    this.isDropdownError = false;
    this.CacheService.searchTerm = option.name;
    this.showDropdown = false;
    this.CacheService.nestedFormValues.medicineId = option.id;
    this.CacheService.nameCurrentMedicines = option.name;

  }
  hideDropDown() {
    if (!this.CacheService.nameCurrentMedicines) {
      this.isDropdownError = true;
      this.showDropdown = false;
    }
    // setTimeout(()=>{
    // },0)
  }

  dropdown() {
    setTimeout(() => {
      this.showDropdown = true;
    }, 0);
  }

  medicamentsForSearch() {
    // if (this.results.length > 0) {
    //   return;
    // }

    return this.recipeService.getMedicamentsForSearch().subscribe(
      (res:{medicaments:DynamicSearchMedicament[]}) => {
        this.CacheService.results = res.medicaments;
        // this.filteredResults = this.results
        // this.showDropdown = true
      },
      (err) => {
        if (err.status === 401) {
          this.CacheService.logout();
        } else {
          this.toastr.error('Нещо се обърка. Моля, опитайте отново.')
        }
      }
    );
  }
}
