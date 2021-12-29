import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip-map',
  template: `
    <div class="tooltipMap" #tooltipMap>
      <div class="date">04.05.21, вторник</div>
      <div class="area"><span class="city">Ташкент</span><span>10</span></div>
    </div>
  `,
  styles: [
    `
      .tooltipMap {
        position: absolute;
        padding: 14px;
        background: #10274a;
        box-shadow: 0px 3px 8px rgba(16, 39, 74, 0.15);
        border-radius: 5px;
        color: #fff;
      }

      .date {
        font-size: 12px;
        opacity: 0.75;
        margin-bottom: 10px;
      }

      .area {
        font-size: 14px;
      }
      .city {
        margin-right: 43px;
      }
    `,
  ],
})
export class TooltipMapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
