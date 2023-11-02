import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DetailsService} from "../../services/details.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor(
    private ActivatedRoute:ActivatedRoute,
    private DetailsService:DetailsService,
    private sanitizer: DomSanitizer

  ) {
  }
  currentMedicine!:any
  imageSrc!: any;


  ngOnInit(){

    this.ActivatedRoute.params.subscribe(params => {
      const productId = params['id'];
      this.DetailsService.getMedicine(productId).subscribe(
        (res:any)=>{
          this.currentMedicine =res


          const reader = new FileReader()

          reader.onload = (e:any)=>{
            this.imageSrc =  URL.createObjectURL(blob);
            console.log(this.imageSrc)

          }
            const blob = new Blob([res.medicineImageBytes], { type: 'image/png' });

          reader.readAsDataURL(blob)
          // setTimeout(()=>{
          //   console.log(this.imageSrc)
          //   // this.imageSrc =`
          //   // `
          //
          // },1000)

          // this.currentMedicine.medicineImageBytes



          // setTimeout(() => {
          //   const reader = new FileReader();
          //   const blob = new Blob([res.medicineImageBytes], { type: 'image/png' });
          //
          //   reader.onload = (event: any) => {
          //     this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
          //     console.log(event.target.result);
          //   };
          //
          //   reader.readAsDataURL(blob); // Read the blob data, not this.imageSrc
          // }, 0);


        },
        (error)=>{
          console.log(error)
        }
      )
    });
  }

}
