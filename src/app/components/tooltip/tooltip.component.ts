import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input() config = {
    position: '',
  };
  tooltipActive = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.config);
  }

  activeTooltip(evt: Event, state: any): void {
    evt.preventDefault();
    this.tooltipActive = state;
  }
}
