import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {}

  goToBack(): void {
    this.router.navigate(['clients/list'], {
      queryParams: { mfo: this.route.snapshot.queryParams.mfo },
    });
  }

  showHistory(): void {
    this.router.navigate(['clients/history'], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }
}
