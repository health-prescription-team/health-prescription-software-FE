import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-recipe-info-med',
  templateUrl: './recipe-info-med.component.html',
  styleUrls: ['./recipe-info-med.component.css']
})
export class RecipeInfoMedComponent implements AfterViewInit{
  constructor(
  private  Renderer2:Renderer2,
  private  ElementRef:ElementRef,
  ) {
  }
  ngAfterViewInit() {
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"display","flex")
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"justify-content","center")
  }
}
