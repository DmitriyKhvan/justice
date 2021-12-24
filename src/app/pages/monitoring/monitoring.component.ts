import { Component, OnInit } from '@angular/core';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../application/shared/settings';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent implements OnInit {
  regionsDic = [
    { value: 1, label: 'Регион1' },
    { value: 2, label: 'Регион2' },
  ];

  filialsDic = [
    { value: 1, label: 'Филиал1' },
    { value: 2, label: 'Филиал2' },
  ];

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor() {}

  ngOnInit(): void {}
}
