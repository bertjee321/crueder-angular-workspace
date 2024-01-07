import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
  standalone: true,
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
