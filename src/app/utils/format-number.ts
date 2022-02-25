// import { CurrencyPipe } from '@angular/common';

function currencyTransform(value: any) {
  // return this.CurrencyPipe.transform(
  //   value.replace(/\D/g, '').replace(/^0+/, ''),
  //   ' ',
  //   'symbol-narrow',
  //   '1.0-0'
  // );

  return new Intl.NumberFormat().format(value.replace(/[^0-9.]/gim, ''));
}

export default currencyTransform;
