import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoaderService } from '../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
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
    private router:Router,
    private toastr:ToastrService,
    private userService:UserService
  ) {}
  currentMedicine!: any;
  imageSrc!: any;
  imagebytes!: any;
  productId!:string
  activeButton: string = 'detailsMed';
  ownerId:string='';
  pharmacyId:string = '';

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      this.medicineDetails(this.productId)
    });

    this.pharmacyId = this.userService.jwtdecrypt(localStorage.getItem('token')!).nameid;

  }

  medicineDetails(productId: string) {
    this.DetailsService.getMedicine(productId).subscribe(
      (res) => {
        this.currentMedicine = res;
        // console.log('this.currentMedicine', this.currentMedicine);
        this.imagebytes = res.medicineImageBytes;
        this.imageSrc = this.binaryToPng(this.imagebytes);
        this.imageSrc =  this.binaryToPng(this.imagebytes);
        const reader = new FileReader();
        this.ownerId=this.currentMedicine.pharmacyId;
      },
      (error) => {
        this.toastr.error('Нещо се обърка. Моля, опитайте отново.')
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

  deleteMedicine(){
    const confirm = window.confirm('Сигурни ли сте, че желаете да изтриете това лекарство?');
    if(confirm){
      this.DetailsService.delMedicament(this.productId).subscribe((res)=>{
        this.router.navigate(['/catalog']);
        this.toastr.success('Лекарството е успешно изтрито.')
      },
      (err)=>{
        this.toastr.error('Нещо се обърка. Моля, опитайте отново.')
      })
    }
  }
}
