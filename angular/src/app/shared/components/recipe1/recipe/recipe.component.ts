import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnChanges {
  recipeId: string | null = '';
  inputselectMedInput: string = '';

  date = new Date();
  options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };
  formattedDate = this.date.toLocaleDateString(undefined, this.options);

  currentRecipe: any = {
    patienEgn: '',
    egn: '',
  };
  isPopUp: boolean = false;

  isEditRecipe: boolean = false;
  isPharmacist: boolean = false;
  role: string | undefined;
  isFulfilled: boolean = true;
  patientEgn: string = '';

  constructor(
    private service: UserService,
    public CacheService: CacheService,
    private http: HttpClient,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.service.jwtdecrypt(token!);
    // console.log(this.formattedDate);

    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id');
      // console.log('ID from URL:', this.recipeId);
    });

    if (this.recipeId) {
      this.isEditRecipe = true;

      this.recipeService.getRecipe(this.recipeId).subscribe((res: any) => {
        // console.log('res', res);
        if (Object.values(res).some((x) => x === '')) {
          return;
        }
        this.currentRecipe = res;
        this.currentRecipe.id = this.recipeId;

        this.CacheService.allMedicinesAdded = res.prescriptionDetails;

        this.years = this.ageFormula(res.patientEgn);
        this.isFulfilled = res.isFulfilled;
        this.patientEgn = res.patientEgn;
      });
    } else {
      this.isFulfilled = false;
    }

    this.getDataFromToken();
    console.log('role', this.role);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('change');
  }

  ageFormula(id: string) {
    //  99 01 02 3428 today:20.11.2023

    const array = [];

    for (let i = 0; i < id.length; i += 2) {
      array.push(`${id[i]}${id[i + 1]}`);
    }
    let [year, month, day] = array.slice(0, 3);
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();

    if (Number(year) >= 23 && Number(year) <= 99) {
      year = `19${year}`;
    } else if (
      Number(year) >= 0 &&
      Number(year) < Number(todayYear.toString().slice(2))
    ) {
      year = `20${year}`;
    }
    return Number(todayYear) - Number(year);
  }
  years: any = '';
  idResponse: any = '';

  recipeInfo(form: NgForm) {
    //POST
    if (form.invalid) return;

    const { patient, patientАge, diagnosis } = form.value;
    const allFields = {
      ...form.value,
      ...this.CacheService.nestedFormValues,
      startDate: this.formattedDate,
    };
    // console.log(patient, patientАge, diagnosis);

    if (!this.recipeId) {
      this.isEditRecipe = false;
      this.ageFormula(this.years);

      allFields.patientАge = this.years;

      const mainData = {
        patientEgn: allFields.patientEgn,
        age: allFields.patientАge,
        diagnosis: allFields.diagnosis,
        expiresAt: allFields.expiresAt || null,
        prescriptionDetails: this.CacheService.allMedicinesAdded,
      };
      this.recipeService.createRecipe(mainData).subscribe(
        (response: any) => {
          this.idResponse = response.PrescriptionId;
          this.toastr.success('Рецептата е добавена успешно!');
        },
        (err) => {
          this.toastr.error('Нещо се обърка. Моля, опитайте отново!');
        }
      );

      //this.rescipeID = response.ID;
    }
    // else {
    //   this.isEditRecipe = true;

    //   const { med, morning, midday, evening, additionalInfo } = allFields;
    //   console.log('allFields', allFields);
    // }
    // console.log('-->',selectMedInput);
  }
  isTen: boolean = false;
  emit(id: string) {
    if (id.length >= 4) {
      this.isTen = true;
      this.years = this.ageFormula(id);
    }
  }

  medicinesInfo(form: NgForm) {
    const {} = form.value;
    const medicines = { ...form.value, ...this.CacheService.nestedFormValues };
    console.log('medicines', medicines);
  }

  editRecipe() {
    // this.isPopUp = true;
    this.recipeService.editRecipe(this.currentRecipe).subscribe(
      (res) => {
        this.toastr.success('Рецептата е редактирана успешно');
      },
      (err) => {
        this.toastr.error('Нещо се обърка. Моля, опитайте отново!');
      }
    );
  }

  doctor: string = '';

  getDataFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenInfo = this.service.jwtdecrypt(token);
      this.doctor = tokenInfo['unique_name'];
      this.role = tokenInfo.role;
      // console.log('tokenInfo', tokenInfo);
    }
  }

  fulfillRecipe() {
    const confirm = window.confirm(
      'Сигурни ли сте, че желаете да изпълните тази рецепта?'
    );
    if (confirm) {
      this.recipeService.fulfillRecipe(this.recipeId!).subscribe(
        (res) => {
          this.router.navigate([
            `/patient/profile/${this.currentRecipe.patientEgn}`,
          ]);
          this.toastr.success('Рецептата е изпълнена!')
        },
        (err) => {
          this.toastr.error('Нещо се обърка. Моля, опитайте отново!');
        }
      );
    }
  }

  delRecipe() {
    const confirm = window.confirm(
      'Сигурни ли сте, че желаете да изтриете тази рецепта?'
    );
    if (confirm) {
      this.recipeService.deletelRecipe(this.recipeId!).subscribe(
        (res) => {
          this.router.navigate([
            `/patient/profile/${this.currentRecipe.patientEgn}`,
          ]);
          this.toastr.success('Рецептата е изтрита успешно!')
        },
        (err) => {
          this.toastr.error('Нещо се обърка. Моля, опитайте отново!');
        }
      );
    }
  }
}
