import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTransform'
})
export class NumberTransformPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
