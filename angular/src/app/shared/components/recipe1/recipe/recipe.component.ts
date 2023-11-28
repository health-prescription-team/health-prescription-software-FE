import { HttpClient } from '@angular/common/http';
import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit,OnChanges {

  recipeId: string = "";
  inputselectMedInput: string = '';

  date = new Date();
  options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };
  formattedDate = this.date.toLocaleDateString(undefined, this.options);

  constructor(
    private service: UserService,
    public CacheService: CacheService,
    private http:HttpClient,
    private recipeService:RecipeService
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.service.jwtdecrypt(token!);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("change")
  }

  ageFormula(id:string){
    //  99 01 02 3428 today:20.11.2023


    const array = [];

       for (let i=0; i < id.length; i+=2) {
        array.push(`${id[i]}${id[i+1]}`);

      }
      let[year,month,day] = array.slice(0,3);
      const todayMonth = new Date().getMonth();
      const todayYear = new Date().getFullYear();

      if(Number(year) >= 23 && Number(year) <= 99){
         year = `19${year}`
      } else if(Number(year) >= 0 && Number(year) < Number(todayYear.toString().slice(2))) {
        year = `20${year}`
      }
      return Number(todayYear) - (Number(year))


  }
  years:any = '';
  idResponse:any = '';

  recipeInfo(form: NgForm) {
    //POST
    const { patient, patientАge, diagnosis } = form.value;
    const allFields = { ...form.value, ...this.CacheService.nestedFormValues, "startDate":this.formattedDate };
    // console.log(patient, patientАge, diagnosis);

    if (!this.recipeId) {
      // response => ID
      // const formData = new FormData()
      // formData.append("Diagnosis",allFields.diagnosis)
      // formData.append("GpName",allFields.doctor)
      // formData.append("CreatedAt",'20.11.2023')
      // formData.append("EGN",allFields.patient)
      // formData.append("EndedDate",allFields.endDate);


      // formData.append("Age",(years).toString());
      // formData.append("PacientId","395ddc52-cbf9-4406-ae94-9b3eb7f5c255");
       this.ageFormula(this.years);


        allFields.patientАge = this.years

        const mainData = {
          patientEgn:allFields.patientEgn,
          age:allFields.patientАge,
          diagnosis:allFields.diagnosis,
          expiresAt:allFields.expiresAt,
          prescriptionDetails:this.CacheService.allMedicinesAdded,

        }
      console.log(mainData)
         this.recipeService.createRecipe(mainData).subscribe((response:any) => {
           console.log(response)
          this.idResponse = response.PrescriptionId;
         },(err) => {
          console.log('ss');

          console.log(err.error.errors);

         })




      //this.rescipeID = response.ID;
    } else {
      //put new medicine
      const { med, morning, midday, evening, additionalInfo } = allFields;
      // console.log(allFields);
      //POST WITH PrescriptinId!
      //  med, morning, midday, evening, additionalInfo
      // console.log(med, morning, midday, evening, additionalInfo);
    }
    // console.log('-->',selectMedInput);
  }
  isTen:boolean = false
  emit(id:string){
   if(id.length >= 4){
    this.isTen = true
   this.years =  this.ageFormula(id);
   }

  }

  medicinesInfo(form: NgForm) {
    const {} = form.value;
    const medicines = { ...form.value, ...this.CacheService.nestedFormValues};
    console.log('medicines', medicines);
  }
}
