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


          // Decode the Base64 data to a Uint8Array
          const rawData = atob(res.medicineImageBytes);
          const dataAsArray = new Uint8Array(rawData.length);
          for (let i = 0; i < rawData.length; i++) {
            dataAsArray[i] = rawData.charCodeAt(i);
          }

// Decompress the GZIP data
          const inflate = new Zlib.Gunzip(dataAsArray);
          const decompressedData = inflate.decompress();

// Now you have the decompressed data
          const decompressedString = String.fromCharCode.apply(null, decompressedData);





          // const reader = new FileReader()
          //
          //   const uint8Array = new Uint8Array(res.medicineImageBytes);
          //
          //   const textDecoder = new TextDecoder('utf-8');
          //
          //   const imageString = textDecoder.decode(uint8Array);
          //
          //   const base64Image = btoa(imageString);
          //
          //   console.log(base64Image);
          // reader.onload = (e:any)=>{
          //
          //
          // }
          //   const blob = new Blob([res.medicineImageBytes], { type: 'image/png' });
          //
          // reader.readAsDataURL(blob)
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
