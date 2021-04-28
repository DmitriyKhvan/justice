import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public mainService: MainService
  ) {}

  prevUrl: any;

  ngOnInit(): void {
    this.mainService.previousUrl.subscribe((url) => {
      this.prevUrl = url;
    });
  }

  goToBack(): void {
    const path = this.prevUrl.url?.split('?')[0];
    const params = this.prevUrl.root?.queryParams;

    this.router.navigate([ path ? path : 'clients/list' ], {
      queryParams: params ? {  ...params } : { ...this.route.snapshot.queryParams },
    });
  }
}
