import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss'],
})
export class ContractInfoComponent implements OnInit {
  @Output() toogleSize = new EventEmitter();

  contract = {
    id: 0,
    clientId: 0,
    clientInn: '',
    clientFio: '',
    clientType: '',
    clientPhone: '',
    clientAddress: '',
    clientMfo: '',
    contractId: 0,
    contractDate: '',
    creditSumm: '',
    creditCurrency: 0,
    creditStart: '',
    creditEnd: '',
    guarantorName: '',
    guarantorInn: '',
    interestRate: '',
    statuUpbuilding: 0,
    remainderCurrentDebt: '',
    remainderOverdueDebt: '',
    remainderOverduePercent: '',
    remainderAccruedPercent: '',
    remainderAccruedPercentOverdueDebt: '',
    pledge: '',
    totalDebt: '',
    delayDate: '',
  };

  flagPageCard: boolean = true;

  constructor(
    private lawsuitService: LawsuitService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(() => {
          return this.lawsuitService.getContractInfo(
            this.route.snapshot.queryParams['contractId']
          );
        })
      )
      .subscribe((contract) => {
        this.contract = contract;
      });
  }

  tooglePageCard(value: any) {
    this.flagPageCard = value;
    this.toogleSize.emit(value);
  }
}
