import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeHtml',
})
export class DecodeHtmlPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value) {
      const parser = new DOMParser();
      const decoded = parser.parseFromString(value, 'text/html').documentElement
        .textContent;
      return decoded || '';
    }
    return '';
  }
}
