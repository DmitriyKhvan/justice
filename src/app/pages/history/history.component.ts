import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(private router: Router, public route: ActivatedRoute) {}

  params: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.params = value;
    });
  }

  goToBack(): void {
    this.router.navigate([`clients/${this.params.step ? 'detail' : 'list'}`], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }
}
