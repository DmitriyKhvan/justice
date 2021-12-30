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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild('table') table!: ElementRef;
  @Input() monitoring: any[] = [];
  monSub!: Subscription;
  // monitoring!: any;

  constructor(private lawsuitService: LawsuitService) {}

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

  ngOnDestroy(): void {
    // if (this.monSub) {
    //   this.monSub.unsubscribe();
    // }
  }
}
