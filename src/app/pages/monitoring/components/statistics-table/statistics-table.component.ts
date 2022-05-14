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

  currentDate = new Date().toLocaleDateString();

  constructor() {}

  ngOnInit(): void {
    console.log('statisticsData', this.statisticsData);
  }

  toggleFilials(className: any) {
    // console.log(event.target.parentNode.nextElementSibling);
    // event.target.parentNode.nextElementSibling.classList.toggle('active');
    console.log(document.querySelectorAll(`.f${className}`));
    const filials = document.querySelectorAll(`.f${className}`);
    filials.forEach((filial: any) =>
      console.log(filial.classList.toggle('active'))
    );
  }

  ngOnDestroy(): void {}
}
