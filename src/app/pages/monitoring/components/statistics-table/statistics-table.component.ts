import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: [
    '../table/table.component.scss',
    './statistics-table.component.scss',
  ],
})
export class StatisticsTableComponent implements OnInit, OnDestroy {
  @ViewChild('table') table!: ElementRef;
  @Input() statisticsData: any[] = [];
  @Input() loader!: boolean;
  isFilial: string[] = [];
  isClient: string[] = [];

  currentDate = new Date().toLocaleDateString();

  constructor() {}

  ngOnInit(): void {
    console.log('statisticsData', this.statisticsData);
  }

  // toggleFilials(className: any) {
  //   console.log(document.querySelectorAll(`.f${className}`));
  //   const filials = document.querySelectorAll(`.f${className}`);
  //   filials.forEach((filial: any) => filial.classList.toggle('active'));
  // }

  toggleFilials(regionCode: string) {
    if (!this.isFilial.includes(regionCode)) {
      this.isFilial.push(regionCode);
    } else {
      this.isFilial = this.isFilial.filter((i) => i !== regionCode);
      // this.isClient = '';
    }
  }

  toggleFilials2(branchMfo: string) {
    if (!this.isClient.includes(branchMfo)) {
      this.isClient.push(branchMfo);
    } else {
      this.isClient = this.isClient.filter((i) => i !== branchMfo);
    }
  }

  ngOnDestroy(): void {}
}
