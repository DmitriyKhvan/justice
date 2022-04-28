import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTransform',
})
export class NumberTransformPipe implements PipeTransform {
  transform(value: any, isTein: boolean = true): string {
    if (value) {
      if (isTein) {
        return new Intl.NumberFormat('ru-RU', {
          minimumFractionDigits: 2,
        }).format(value.replace(/[^0-9.]/gim, '') / 100);
      } else {
        return new Intl.NumberFormat('ru-RU').format(
          value.replace(/[^0-9.]/gim, '')
        );
      }
    } else {
      return '';
    }
  }
}
