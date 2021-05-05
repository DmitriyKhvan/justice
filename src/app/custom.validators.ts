import { FormControl } from '@angular/forms';

export class CustomValidators {
  static uppercaseText(
    control: FormControl
  ): { [key: string]: boolean } | null {
    if (!String(control.value).match(/^[A-Z]+$/)) {
      return { isUppercaseText: true };
    }
    return null;
  }
}
