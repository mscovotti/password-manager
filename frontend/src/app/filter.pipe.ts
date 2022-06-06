import { Pipe, PipeTransform } from '@angular/core';
import { PasswordCard } from './password-card';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Returns the elements of a list of objects whose fieldName field matches with searchText
   *
   * @template T
   * @param {(T[] | null)} list The list of objects to filter
   * @param {string} fieldName The name of the field that needs to match with searchText
   * @param {string} searchText The matching text
   * @return {(T[] | null)}
   * @memberof FilterPipe
   */
  transform<T>(list: T[] | null, fieldName: string, searchText: string): T[] | null {
    searchText = searchText.toLocaleLowerCase();
    if (!searchText) return list;
    return list?.filter((item: {[key: string]: any}) => {
      if (typeof item[fieldName] != 'string') return false;
      return item[fieldName]?.toLowerCase().includes(searchText)
    }) || null;
  }

}
