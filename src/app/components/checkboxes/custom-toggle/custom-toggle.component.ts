import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-custom-toggle',
  template: `
    <label
      class="custom-toggle my-2"
      [class.custom-toggle-active]="inputControl.value"
      [ngSwitch]="type"
    >
      <input
        type="checkbox"
        [checked]="inputControl.value"
        #input
        [formControl]="inputControl"
      />
      <div class="custom-toggle-checkbox mr-1" *ngSwitchCase="'checkbox'">
        <i class="uil-check"></i>
      </div>
      <div class="custom-toggle-track mr-1" *ngSwitchCase="'toggle'">
        <div class="custom-toggle-thumb"></div>
      </div>
      {{ label }}
    </label>
  `,
  styles: [
    `
      /*.custom-toggle {*/
      /*  position: relative;*/
      /*  display: flex;*/
      /*  align-items: center;*/
      /*  cursor: pointer;*/
      /*}*/

      /*.custom-toggle input {*/
      /*  position: absolute;*/
      /*  left: 0;*/
      /*  right: 0;*/
      /*  opacity: 0;*/
      /*}*/

      /*.custom-toggle-checkbox {*/
      /*  width: 20px;*/
      /*  height: 20px;*/
      /*  border-radius: 3px;*/
      /*  border: 1px solid #10274a;*/
      /*  display: flex;*/
      /*  justify-content: center;*/
      /*  align-items: center;*/
      /*  color: #10274a;*/
      /*  font-size: 20px;*/
      /*}*/

      /*.custom-toggle-checkbox i {*/
      /*  transition: opacity 0.2s;*/
      /*  opacity: 0;*/
      /*}*/

      /*.custom-toggle-track {*/
      /*  width: 44px;*/
      /*  height: 24px;*/
      /*  background: rgba(16, 39, 74, 0.31);*/
      /*  box-shadow: 0px 3px 15px 1px rgba(35, 44, 81, 0.05);*/
      /*  border-radius: 30px;*/
      /*  display: flex;*/
      /*  align-items: center;*/
      /*  transition: background 0.2s;*/
      /*}*/

      /*.custom-toggle-thumb {*/
      /*  width: 20px;*/
      /*  height: 20px;*/
      /*  border-radius: 50%;*/
      /*  background: #ffffff;*/
      /*  margin: 2px;*/
      /*  transition: transform 0.2s;*/
      /*  transform: translateX(0);*/
      /*}*/

      /*.custom-toggle-active .custom-toggle-checkbox i {*/
      /*  opacity: 1;*/
      /*}*/

      /*.custom-toggle-active .custom-toggle-track {*/
      /*  background: #10274a;*/
      /*}*/

      /*.custom-toggle-active .custom-toggle-thumb {*/
      /*  transform: translateX(100%);*/
      /*}*/
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomToggleComponent),
      multi: true,
    },
  ],
})
export class CustomToggleComponent implements OnInit, ControlValueAccessor {
  @Input() type = 'checkbox'; // 'checkbox' || 'toggle' //
  @Input() label = '';

  @Output() isChecked: EventEmitter<any> = new EventEmitter();

  @ViewChild('input') input!: ElementRef;

  inputControl!: FormControl;
  onChange: any;
  onTouch: any;

  constructor() {}

  ngOnInit(): void {
    this.inputControl = new FormControl();
    this.inputControl.valueChanges.subscribe((val) => {
      console.log(this.inputControl);
      this.isChecked.emit(val);
      if (this.onChange) {
        this.onChange(val);
      }
    });
  }

  writeValue(value: any): void {
    this.inputControl.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
