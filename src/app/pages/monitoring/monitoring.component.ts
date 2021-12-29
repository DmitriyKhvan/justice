import { Component, OnInit } from '@angular/core';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClientsService } from 'src/app/services/clients.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from '../application/shared/settings';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent implements OnInit {
  regionsDic = [];

  filialsDic: any[] = [];

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  regionsSub!: Subscription;

  filials!: any;

  monitoring: any[] = [];

  titleTab: string = 'Мониторинг';

  flag: string = 'monitoring';

  constructor(
    public clientService: ClientsService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.regionsSub = this.clientService.getMfo().subscribe((regions) => {
      this.regionsDic = regions.data;
    });
  }

  selectTab(titleTab: string, flag: string) {
    this.titleTab = titleTab;
    this.flag = flag;
  }

  setDistrict(region: any) {
    console.log(region);
    if (region) {
      this.filialsDic = region.branches;
      this.filials = [];
    } else {
      this.filialsDic = [];
      this.filials = [];
    }
  }

  setFilials(mfos: any) {
    // console.log(mfos);
    const data = {
      mfos,
    };
    // console.log(this.filials);
    this.lawsuitService
      .monitoring(data)
      .pipe(debounceTime(700))
      .subscribe((monitoring) => {
        this.monitoring = monitoring;
        console.log(this.monitoring);
      });
  }
}
