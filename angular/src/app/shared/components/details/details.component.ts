import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoaderService } from '../../services/loader.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DetailsService: DetailsService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
    public ls:LoaderService
  ) {}
  currentMedicine!: any;
  imageSrc!: any;
  imagebytes!: any;
  dataTYPE: any;

  displayImage(dataUrl: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      const productId = params['id'];
      this.DetailsService.getMedicine(productId).subscribe(
        (res: any) => {
          this.currentMedicine = res;
          console.log('this.currentMedicine', this.currentMedicine);
          this.imagebytes = res.medicineImageBytes;

          function binaryToPng(binary: any) {

            return 'data:image/png;base64,' + (binary);
          }

          const result = binaryToPng(this.imagebytes)
          this.imageSrc = result


          const binaryToPngResult = binaryToPng(this.imagebytes);
          this.imageSrc = binaryToPngResult


          const reader = new FileReader();

        },
        (error)=>{
          console.log(error)
        }
      )
    });
  }
}