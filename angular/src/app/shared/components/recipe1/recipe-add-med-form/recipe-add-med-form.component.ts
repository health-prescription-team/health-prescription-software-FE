import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgModel} from "@angular/forms";
import { CacheService } from 'src/app/shared/services/cache.service';

@Component({
  selector: 'app-recipe-add-med-form',
  templateUrl: './recipe-add-med-form.component.html',
  styleUrls: ['./recipe-add-med-form.component.css']
})
export class RecipeAddMedFormComponent implements AfterViewInit{
  selectedMedicine:string='';

  @ViewChild("inputselectMedInput") inputselectMedInput!: NgModel
  @ViewChild("inputmorning") inputmorning!: NgModel
  @ViewChild("inputadditionalInfo") inputadditionalInfo!: NgModel
  @ViewChild("inputmidday") inputmidday!: NgModel
  @ViewChild("inputevening") inputevening!: NgModel
  @Output("nestedFormValues") customEvent  = new EventEmitter<object>()

currentmedicine:any = '';
  constructor(
    private  Renderer2:Renderer2,
    private  ElementRef:ElementRef,
    public CacheService:CacheService,
  ) {
  }
clearAllFields(){

}

  emit(){
    this.currentmedicine = {
      "med":this.selectedMedicine,
      "morning":this.inputmorning.value,
      "midday":this.inputmidday.value,
      "evening":this.inputevening.value,
      "additionalInfo":this.inputadditionalInfo.value,
    }
    this.customEvent.emit(this.currentmedicine);
  }
  ngAfterViewInit() {
    this.setStyles()
  }
  searchHandler(seacrchWord:any){
    console.log(seacrchWord.value);
  
  }
  setStyles(){
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"display","flex")
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"justify-content","center")
  }
}
