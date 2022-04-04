import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTransform',
})
export class NumberTransformPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      return new Intl.NumberFormat().format(value.replace(/[^0-9.]/gim, ''));
    } else {
      return '';
    }
  }
}
