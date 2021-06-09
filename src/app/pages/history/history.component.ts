import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import {ClientsService} from '../../services/clients.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public mainService: MainService,
    public clientsService: ClientsService
  ) {}

  params: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      this.params = val;
      this.clientsService.contractDetails(val.contract).subscribe(value => {
        this.clientsService.contractInfo.next(value);
      });
    });
  }

  goToBack(): void {
    this.router.navigate([`clients/${this.params.step ? 'detail' : 'list'}`], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }
}
