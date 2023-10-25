import {AfterViewInit, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-recipe-add-med-form',
  templateUrl: './recipe-add-med-form.component.html',
  styleUrls: ['./recipe-add-med-form.component.css']
})
export class RecipeAddMedFormComponent implements AfterViewInit{

  @ViewChild("inputselectMedInput") inputselectMedInput!: NgModel
  @ViewChild("inputmorning") inputmorning!: NgModel
  @ViewChild("inputadditionalInfo") inputadditionalInfo!: NgModel
  @ViewChild("inputmidday") inputmidday!: NgModel
  @ViewChild("inputevening") inputevening!: NgModel
  @Output("nestedFormValues") customEvent  = new EventEmitter<object>()

  constructor(
    private  Renderer2:Renderer2,
    private  ElementRef:ElementRef,
  ) {
  }
  emit(){
    this.customEvent.emit({
      "med":this.inputselectMedInput.value,
      "morning":this.inputmorning.value,
      "midday":this.inputmidday.value,
      "evening":this.inputevening.value,
      "additionalInfo":this.inputadditionalInfo.value,
    });
  }
  ngAfterViewInit() {
    this.setStyles()
  }
  setStyles(){
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"display","flex")
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"justify-content","center")
  }
}
