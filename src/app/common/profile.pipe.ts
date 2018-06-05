import { Pipe, PipeTransform } from '@angular/core';  
import { Profile } from '../profile';  
  
@Pipe({  
    name: 'profileFilter',  
    pure: false  
})  
  
export class profilePipe implements PipeTransform {  
    transform(items: any[], filter: string): any {  
        if (!items || !filter) {  
            return items;
        }
        return items.filter(item => item.first_name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}  