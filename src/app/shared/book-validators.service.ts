import {Injectable} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class BookValidatorsService {


  static isbnFormat(control: FormControl): {
    [error: string]: any
  } {
    if (!control.value) {
      return null;
    }
    //regular expressions
    const isolatedNumbers = control.value.replace(/-/g, '');
    const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;
    return isbnPattern.test(isolatedNumbers) ? null : {isbnFormat: {valid: false}}
  }

  static atLeastOneImage(controlArray: FormArray): {[error: string]: any} {
    const check = controlArray.controls.some((el) => {
      return el.value && el.value.url != "" && el.value.url != null
      && el.value.title != "" && el.value.title != null ? true : false
    })
    return check ? null : {atLeastOneImage: {valid: false}};
  }
}
