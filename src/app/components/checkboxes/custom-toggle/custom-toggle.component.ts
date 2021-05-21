import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-custom-toggle',
  template: `
    <label class="custom-toggle my-2">
      <input type="checkbox" [checked]="checked" #state/>
      <div class="custom-toggle-track mr-1">
        <div class="custom-toggle-thumb"></div>
      </div>
      {{ text }}
    </label>
  `,
  styles: [
    `
      .custom-toggle {
        position: relative;
        display: flex;
        align-items: center;
      }

      .custom-toggle input {
        position: absolute;
        left: 0;
        right: 0;
        opacity: 0;
      }

      .custom-toggle-track {
        width: 44px;
        height: 24px;
        background: rgba(16, 39, 74, 0.31);
        box-shadow: 0px 3px 15px 1px rgba(35, 44, 81, 0.05);
        border-radius: 30px;
      }
    `,
  ],
})
export class CustomToggleComponent implements OnInit {
  @Input() checked = false;
  @Input() text = '';

  @Output() isChecked: EventEmitter<boolean> = new EventEmitter();

  checkboxState = false;

  constructor() {}

  ngOnInit(): void {}
}
