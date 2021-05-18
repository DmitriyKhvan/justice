import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert-info',
  template: `
      <div class="p-2 mb-2 d-flex justify-content-center align-items-center bg-gray-secondary" style="border-radius: 5px">
          <i [ngClass]="[icon, iconColorClass]" style="font-size: 20px"></i>
          <div class="w-50" [ngClass]="[textColorClass]" style="text-align: center">
              {{ text }}
          </div>
      </div>
  `,
  styles: [
  ]
})
export class AlertInfoComponent implements OnInit {
  @Input() text = '';
  @Input() textColorClass = '';
  @Input() icon = '';
  @Input() iconColorClass = '';
  constructor() { }

  ngOnInit(): void {
  }

}
