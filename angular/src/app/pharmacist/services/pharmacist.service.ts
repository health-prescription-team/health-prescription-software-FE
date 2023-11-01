import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { medicineEndpoint, prescriptionEndpoint} from 'src/app/shared/constants'


@Injectable({
  providedIn: 'root'
})
export class PharmacistService {

  constructor(private http:HttpClient) { }

  getPrescriptionById(id:string) {
    return this.http.get(prescriptionEndpoint+'/'+id)
  }
}
