import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PharmacyService } from '../services/pharmacy.service';
import { CacheService } from 'src/app/shared/services/cache.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { ToastrService } from 'ngx-toastr';
import {MedicamentCatalogDetails} from "../../shared/interfaces";
@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent implements OnInit {
  idMedicament: string = '';
  // @ts-ignore
  currentMedicine: MedicamentCatalogDetails ;
  isEditMode: boolean = false;
  isNewImage: boolean = false;
  form!: FormGroup;
  constructor(
    private pharmacyService: PharmacyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private Router: Router,
    private detailsService: DetailsService,
    private fb: FormBuilder,
    private toastr:ToastrService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.idMedicament = params['medId'];
      if (this.idMedicament) {
        this.isEditMode = true;
        this.form = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          ingredients: ['', [Validators.required, Validators.minLength(3)]],
          medicineDetails: ['', [Validators.required, Validators.minLength(3)]],
          price: ['', [Validators.required]],
        });
      } else {
        this.form = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          ingredients: ['', [Validators.required, Validators.minLength(3)]],
          medicineDetails: ['', [Validators.required, Validators.minLength(3)]],
          price: ['', [Validators.required]],
          inputImage: ['', [Validators.required]],
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.medicineDetails(this.idMedicament);
    }

    if (this.isEditMode && this.currentMedicine.imageFileName) {
      this.imageBinary = 'existing_image_filename.jpg';
    }
  }
  redirectToMedicineDetails(id:string){
    this.Router.navigate(['/details',id])
  }

  getFormData(formValue: any) {
    const formData = new FormData();

    const array = Object.entries(formValue);
    for (const arrayElement of array) {
      // @ts-ignore
      formData.append(arrayElement[0], arrayElement[1]);
    }

    return formData;
  }

  imageBinary: any;

  handleFileInput(event: any) {
    this.isNewImage = true;

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const blob = new Blob([e.target.result], { type: file.type });
        this.imageBinary = blob;
      };

      reader.readAsArrayBuffer(file);
    }
  }

  addMedicine(form: NgForm) {
    const token = localStorage.getItem('token');
    const data = this.userService.jwtdecrypt(token!);

    if (form.invalid) return;
    const payload = this.getFormData(form.value);
    // payload.forEach((el) => console.log(el));

    payload.delete('MedicineImage');

    if (this.isNewImage) {
      payload.append('MedicineImage', this.imageBinary);
    }

    payload.append('MedicineCompany', data.unique_name);

    if (this.isEditMode) {
      this.pharmacyService.editMedicine(this.idMedicament, payload).subscribe(
        (res) => {
          this.redirectToMedicineDetails(this.idMedicament)
          this.toastr.success('Лекарството е редактирано успешно!');
        },
        (err) => {
          this.toastr.error('Неуспешна редакция. Моля, опитайте отново!');
        }
      );
    } else {
      this.pharmacyService.addMeidicine(payload).subscribe(
         () => {
           this.redirectToMedicineDetails(this.idMedicament)
          this.toastr.success('Добавено е ново лекарство!');
        },
        (err) => {
          this.toastr.error('Неуспешно добавяне на лекарство. Моля, опитайте отново!');
        },
      );
    }
    form.reset();
  }

  medicineDetails(productId: string) {
    this.detailsService.getMedicine(productId).subscribe(
      (res:MedicamentCatalogDetails) => {
        this.currentMedicine = res;
        // console.log(this.currentMedicine);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
