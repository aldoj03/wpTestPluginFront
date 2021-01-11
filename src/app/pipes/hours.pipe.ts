import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value < 10 ? '0' + value: value ;
  }

}
