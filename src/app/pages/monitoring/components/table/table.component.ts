import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { IMonitoring } from '../../interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild('table') table!: ElementRef;
  // @Input() monitoringData: IMonitoring[] = [
  //   {
  //     clientFio: '',
  //     clientId: null,
  //     clientInn: '',
  //     clientType: '',
  //     contractDate: '',
  //     contractFile: '',
  //     contractId: null,
  //     creditCurrency: '',
  //     creditEnd: '',
  //     creditId: null,
  //     creditStart: '',
  //     creditSumm: '',
  //     creditType: '',
  //     delayDate: '',
  //     gType: [
  //       {
  //         active: false,
  //         description: '',
  //         id: null,
  //         lang: {
  //           en: '',
  //           ru: '',
  //           uz: '',
  //         },
  //         order: 0,
  //         type: '',
  //         value: '',
  //       },
  //     ],
  //     guarantee: [],
  //     id: null,
  //     interestRate: null,
  //     lastStepStatus: '',
  //     penaltyCharge: '',
  //     remainderCurrentDebt: '',
  //     status: null,
  //     statusName: {},
  //     totalDebt: '',
  //   },
  // ];
  @Input() monitoringData: any;

  @Input() typeReport: string = '';
  @Input() loader!: boolean;
  monSub!: Subscription;

  currentYear = new Date().getFullYear();
  // monitoring!: any;

  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {
    // const mfos = {
    //   mfos: ['00552'],
    // };
    // this.monSub = this.lawsuitService
    //   .monitoring(mfos)
    //   .subscribe((monitoring) => {
    //     console.log(monitoring);
    //     this.monitoring = monitoring;
    //   });
  }

  getGuarantee(idx: number, type: string) {
    return this.monitoringData[idx].gType.find(
      (t: { value: string }) => t.value === type
    )?.lang.ru;
  }

  ngOnDestroy(): void {
    // if (this.monSub) {
    //   this.monSub.unsubscribe();
    // }
  }
}
