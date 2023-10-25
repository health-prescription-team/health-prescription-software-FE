import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-recipe-add-med-form',
  templateUrl: './recipe-add-med-form.component.html',
  styleUrls: ['./recipe-add-med-form.component.css']
})
export class RecipeAddMedFormComponent implements AfterViewInit{
  
  constructor(
    private  Renderer2:Renderer2,
    private  ElementRef:ElementRef,
  ) {
  }
  ngAfterViewInit() {
    this.setStyles()
  }
  setStyles(){
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"display","flex")
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"justify-content","center")
  }
}
