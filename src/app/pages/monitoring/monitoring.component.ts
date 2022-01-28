import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as XLSX from 'xlsx';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClientsService } from 'src/app/services/clients.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { TableComponent } from './components/table/table.component';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { datepickerSettings } from 'src/app/settings';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('childComp') childComp!: TableComponent;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  regionsSub!: Subscription;
  statusSub!: Subscription;

  titleTab: string = 'Мониторинг';
  flag: string = 'monitoring';
  loader: boolean = false;
  dataFilter: any = {};

  regionsDic = [];
  filialsDic: any[] = [];
  statusDic: any[] = [];

  filials: any[] = [];
  monitoring: any[] = [];
  status: any[] = [];

  constructor(
    public clientService: ClientsService,
    public lawsuitService: LawsuitService,
    public dicService: DictionariesService
  ) {}

  ngOnInit(): void {
    this.regionsSub = this.dicService.getRegions().subscribe((regions) => {
      this.regionsDic = regions.data;
    });

    this.statusSub = this.dicService
      .getDic('IABS_CASE_STATUS')
      .subscribe((status) => {
        this.statusDic = status;
      });
  }

  ngAfterViewInit() {}

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

    this.monitoring = [];
    if (region.code === '00') {
      const AllMfos = region.branches[0].mfo;
      this.setFilterData([AllMfos], 'mfos');
      this.filialsDic = region.branches;
      this.filials = [AllMfos];
    } else if (region.code !== '00') {
      this.filialsDic = region.branches;
      this.filials = [];
    } else {
      this.filialsDic = [];
      this.filials = [];
      this.dataFilter = {};
    }
  }

  setFilterData(data: any, key: string) {
    this.monitoring = [];
    this.loader = true;
    this.dataFilter = {
      ...this.dataFilter,
      [key]: data,
    };
    // console.log(this.filials);
    this.lawsuitService
      .monitoring(this.dataFilter)
      .pipe(debounceTime(700))
      .subscribe(
        (monitoring) => {
          this.loader = false;
          this.monitoring = monitoring;
        },
        (error) => {
          this.loader = false;
        }
      );
  }

  // setFilials(mfos: any) {
  //   // console.log(mfos);

  //   this.monitoring = [];
  //   this.loader = true;
  //   this.dataFilter = {
  //     ...this.dataFilter,
  //     mfos,
  //   };
  //   // console.log(this.filials);
  //   this.lawsuitService
  //     .monitoring(this.dataFilter)
  //     .pipe(debounceTime(700))
  //     .subscribe(
  //       (monitoring) => {
  //         this.loader = false;
  //         this.monitoring = monitoring;
  //       },
  //       (error) => {
  //         this.loader = false;
  //       }
  //     );
  // }

  // setStatus(status: any) {
  //   // console.log(mfos);

  //   this.monitoring = [];
  //   this.loader = true;
  //   this.dataFilter = {
  //     ...this.dataFilter,
  //     status,
  //   };
  //   // console.log(this.filials);
  //   this.lawsuitService
  //     .monitoring(this.dataFilter)
  //     .pipe(debounceTime(700))
  //     .subscribe(
  //       (monitoring) => {
  //         this.loader = false;
  //         this.monitoring = monitoring;
  //       },
  //       (error) => {
  //         this.loader = false;
  //       }
  //     );
  // }

  ngOnDestroy(): void {
    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }
  }
}
