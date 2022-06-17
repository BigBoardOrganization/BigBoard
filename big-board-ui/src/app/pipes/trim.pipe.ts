import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string, maxLength: number = 50): string {
    let newValue = value;

    if(value.length > maxLength) {
      newValue = value.slice(0, maxLength) + '...'
    }

    return newValue;
  }

}
