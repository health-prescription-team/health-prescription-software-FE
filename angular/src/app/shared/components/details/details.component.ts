import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
    public loaderService: LoaderService,
    private router:Router
  ) {}
  currentMedicine!: any;
  imageSrc!: any;
  imagebytes!: any;
  productId!:string
  activeButton: string = 'detailsMed';

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      this.medicineDetails(this.productId)
    });
  }

  medicineDetails(productId: string) {
    this.DetailsService.getMedicine(productId).subscribe(
      (res: any) => {
        this.currentMedicine = res;
        // console.log('this.currentMedicine', this.currentMedicine);
        this.imagebytes = res.medicineImageBytes;
        const result = this.binaryToPng(this.imagebytes);
        this.imageSrc = result;
        const binaryToPngResult = this.binaryToPng(this.imagebytes);
        this.imageSrc = binaryToPngResult;
        const reader = new FileReader();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  binaryToPng(binary: any) {
    return 'data:image/png;base64,' + binary;
  }

  changeContent(event: Event): void {
    const buttonName = (event.target as HTMLElement).id;
    this.activeButton = buttonName;
  }

  editMedicine() {

    this.router.navigate(['/pharmacy/add-medicine'], {
      queryParams: { medId: this.productId }
    });
  }
}
