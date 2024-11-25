import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item/item';
@Pipe({
  name: 'filterByType',
  standalone: true
})

export class FilterByTypePipe implements PipeTransform {
    transform(items: Item[] | null | undefined, typeLabel: string): Item[] {
      return items?.filter(item => item.type === typeLabel) ?? [];
    }
    
}
