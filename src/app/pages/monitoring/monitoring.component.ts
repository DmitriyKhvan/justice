import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClientsService } from 'src/app/services/clients.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from '../application/shared/settings';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent implements OnInit, AfterViewInit {
  @ViewChild('childComp') childComp!: TableComponent;
  regionsDic = [];

  filialsDic: any[] = [];

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  regionsSub!: Subscription;

  filials: any[] = [];

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

  ngAfterViewInit() {
    console.log(this.childComp.table);
  }

  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.childComp.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Мониторинг');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
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

        setTimeout(() => {
          console.log(this.childComp.table);
        });
      });
  }
}
