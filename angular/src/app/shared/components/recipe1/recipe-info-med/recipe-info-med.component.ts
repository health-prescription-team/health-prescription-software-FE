import {AfterViewInit, Component, ElementRef, Input, Renderer2} from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {DetailsService} from "../../../services/details.service";
import {CacheService} from "../../../services/cache.service";

@Component({
  selector: 'app-recipe-info-med',
  templateUrl: './recipe-info-med.component.html',
  styleUrls: ['./recipe-info-med.component.css']
})
export class RecipeInfoMedComponent implements AfterViewInit{

@Input('med') currentRecord:any;
@Input('index') index:any;
@Input('currentRecipe') currentRecipe:any;


  constructor(
  private  Renderer2:Renderer2,
  private  CacheService:CacheService,
  private  ElementRef:ElementRef,
  public userService:UserService,
  public DetailsService:DetailsService,
  private cacheService:CacheService
  ) {
  }
  medicine:any
  ngAfterViewInit() {
    this.setStyles()
  }
  finishMedicine(){
    this.medicine = this.CacheService.allMedicinesAdded[this.index]
    this.CacheService.allMedicinesAdded[this.index] = {...this.medicine, isFinished:true}
  }
  setStyles(){
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"display","flex")
    this.Renderer2.setStyle(this.ElementRef.nativeElement,"justify-content","center")
  }
  editCurrentMedicament(){
    console.log('toggle');
    this.CacheService.showAddMedicineComponent();
    this.CacheService.nestedFormValues = {...this.CacheService.allMedicinesAdded[this.index]}



  }
}
