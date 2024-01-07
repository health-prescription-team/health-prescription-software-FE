// import {AfterViewInit, Component, ElementRef, Input, Renderer2} from '@angular/core';
// import { UserService } from '../../../services/user.service';
// import {DetailsService} from "../../../services/details.service";
// import {CacheService} from "../../../services/cache.service";

// @Component({
//   selector: 'app-recipe-info-med',
//   templateUrl: '../../recipe1/recipe-add-med-form/recipe-add-med-form.component.html',
//   styleUrls: ['../../recipe1/recipe-add-med-form/recipe-add-med-form.component.css']
// })
// export class RecipeInfoMedComponent implements AfterViewInit{

// @Input('med') currentRecord:any;
// @Input('index') index:any;
// @Input('currentRecipe') currentRecipe:any;


//   constructor(
//   private  Renderer2:Renderer2,
//   private  CacheService:CacheService,
//   private  ElementRef:ElementRef,
//   public userService:UserService,
//   public DetailsService:DetailsService,
//   ) {
//   }
//   ngAfterViewInit() {
//     this.setStyles()
//   }
//   finishMedicine(){
//     let medicine = this.CacheService.allMedicinesAdded[this.index]
//     this.CacheService.allMedicinesAdded[this.index] = {...medicine, isFinished:true}
//   }
//   setStyles(){
//     this.Renderer2.setStyle(this.ElementRef.nativeElement,"display","flex")
//     this.Renderer2.setStyle(this.ElementRef.nativeElement,"justify-content","center")
//   }
//   editCurrentMed(){
//     console.log('edit Current Med');

//   }
// }
