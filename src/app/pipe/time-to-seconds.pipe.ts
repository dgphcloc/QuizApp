import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeToSeconds' })
export class TimeToSecondsPipe implements PipeTransform {
  transform(value: number): number {
    if (!value) return 0;
    return value / 1000;
  }
}
