import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  constructor(private service: UserService, public CacheService :CacheService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.service.jwtdecrypt(token!);
  }

  nestedFormValues = {};
  recipeInfo(form: NgForm) {
    const {
      patient,
      patientАge,
      doctor,
      diagnosis,
      selectMedInput,
      morning,
      midday,
      evening,
      additionalInfo,
    } = form.value;
    const allFields = { ...form.value, ...this.nestedFormValues };
    console.log(allFields);
    // console.log('-->',selectMedInput);
  }

}
