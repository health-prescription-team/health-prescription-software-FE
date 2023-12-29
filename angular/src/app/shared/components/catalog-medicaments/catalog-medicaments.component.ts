import { AfterViewInit, Component } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-catalog-medicaments',
  templateUrl: './catalog-medicaments.component.html',
  styleUrls: ['./catalog-medicaments.component.css'],
})
export class CatalogMedicamentsComponent implements AfterViewInit {
  constructor(private CatalogService: CatalogService, public loaderService: LoaderService) {}
  all: any;
  binaryToPng(binary: any) {
    return 'data:image/png;base64,' + binary;
  }
  ngAfterViewInit() {
    this.CatalogService.getAll().subscribe(
      (res: any) => {
        this.all = res.medicines;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
