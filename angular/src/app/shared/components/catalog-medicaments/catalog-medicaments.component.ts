import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { LoaderService } from '../../services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalog-medicaments',
  templateUrl: './catalog-medicaments.component.html',
  styleUrls: ['./catalog-medicaments.component.css'],
})

export class CatalogMedicamentsComponent implements OnInit {
  entriesPerPage: number = 10;
  searchTerm: string = '';
  pageNumber: number = 1;
  maxPage: number =0;
  medicinesCount: number =0;
  allMedicaments: any;

  constructor(
    private CatalogService: CatalogService,
    public loaderService: LoaderService,
    private toastr:ToastrService
  ) {}

  binaryToPng(binary: any) {
    return 'data:image/png;base64,' + binary;
  }

  ngOnInit(): void {
    this.searchMed();
  }

  searchMed() {
    this.allMedicaments = [];
    this.CatalogService.getMedications(
      this.searchTerm,
      this.pageNumber,
      this.entriesPerPage
    ).subscribe(
      (res: any) => {
        this.allMedicaments = res.medicines;
        this.medicinesCount = res.medicinesCount;
        this.maxPage = Math.ceil(this.medicinesCount/this.entriesPerPage);
      },
      (error) => {
        this.toastr.error('Неуспешно търсене! Моля, опитайте отново!')
      }
    );
  }

  goToPage(newPage: number) {
    if (newPage > this.pageNumber) {
      this.pageNumber++;
    } else if (newPage < this.pageNumber) {
      this.pageNumber--;
    }

    this.searchMed()
  }

}
