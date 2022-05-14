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
  @ViewChild('monitoring') monitoring!: TableComponent;
  @ViewChild('statistics') statistics!: TableComponent;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  regionsSub!: Subscription;
  statusSub!: Subscription;
  statisticsSub!: Subscription;

  titleTab: string = 'Мониторинг';
  flag: string = '';
  loader: boolean = false;
  dataFilter: any = {};
  keyFilster: any = null;
  valueFilter: any = null;

  regionsDic = [];
  filialsDic: any[] = [];
  statusDic: any[] = [];

  filials: any[] = [];
  monitoringData: any[] = [];
  statisticsData: any[] = [];

  status: any[] = [];

  typeReportDic = [
    { label: 'Детальный', value: 'monitoring' },
    { label: 'Статистика', value: 'statistics' },
  ];

  // selectedTypeReport = this.typeReportDic.find(
  //   (el) => el.value === 'statistics'
  // );

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

  fireEvent(typeReport: any) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      typeReport === 'monitoring'
        ? this.monitoring.table.nativeElement
        : this.statistics.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Мониторинг');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  selectTab(titleTab: string, flag: string) {
    console.log(titleTab, flag);

    if (flag) {
      this.titleTab = titleTab;
      this.flag = flag;

      // if (this.flag === 'statistics') {
      //   this.getAllFilials();
      // } else if (this.flag === 'monitoring') {

      // }

      this.setFilterData(this.valueFilter, this.keyFilster);
    } else {
      this.flag = '';
    }
  }

  getAllFilials() {
    const data = {};
    this.statisticsSub = this.lawsuitService
      .statistics(data)
      .subscribe((statistics) => {
        this.statisticsData = statistics;
      });
  }

  setDistrict(region: any) {
    this.monitoringData = [];

    if (region) {
      if (region.code === '00') {
        if (this.flag === 'monitoring') {
          const AllMfos = region.branches[0].mfo;
          this.setFilterData([AllMfos], 'mfos');
          this.filialsDic = region.branches;
          this.filials = [AllMfos];
        } else if (this.flag === 'statistics') {
          this.getAllFilials();
        }
      } else if (region.code !== '00') {
        this.filialsDic = region.branches;
        this.filials = [];

        if (this.flag === 'statistics') {
          const data = {
            regionsCode: [region.code],
          };
          this.statisticsSub = this.lawsuitService
            .statistics(data)
            .subscribe((statistics) => {
              this.statisticsData = statistics;
            });
        }
      }
    } else {
      if (this.flag === 'monitoring') {
        this.filialsDic = [];
        this.filials = [];
        this.dataFilter = {};
      } else if (this.flag === 'statistics') {
        this.getAllFilials();
      }
    }
  }

  setFilterData(data: any = {}, key: string = '') {
    this.monitoringData = [];
    this.loader = true;
    this.dataFilter = {
      ...this.dataFilter,
      [key]: data,
    };

    this.keyFilster = key;
    this.valueFilter = data;

    if (this.flag === 'monitoring') {
      if (this.valueFilter) {
        this.lawsuitService
          .monitoring(this.dataFilter)
          .pipe(debounceTime(700))
          .subscribe((monitoring) => {
            this.loader = false;
            this.monitoringData = monitoring;
          });
      } else {
        this.loader = false;
        this.monitoringData = [];
      }
    } else if (this.flag === 'statistics') {
      if (this.valueFilter) {
        this.statisticsSub = this.lawsuitService
          .statistics(this.dataFilter)
          .subscribe((statistics) => {
            this.loader = false;
            this.statisticsData = statistics;
          });
      } else {
        this.getAllFilials();
      }
    }
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
