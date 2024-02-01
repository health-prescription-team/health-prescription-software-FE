import { Component, OnInit } from '@angular/core';
import { CacheService } from '../shared/services/cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private cacheService:CacheService) {
    this.cacheService.logout()

  }
  ngOnInit (): void {
    // this.cacheService.logout()
  }

}
