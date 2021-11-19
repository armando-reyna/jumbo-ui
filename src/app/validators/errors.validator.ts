import {FormGroup} from '@angular/forms';

export class ErrorsValidator {

  static showError(fc: FormGroup, ngForm:any, validation:any, name:any) {
    let isFirst = false;
    if(fc.get(name).errors){
      Object.keys(fc.get(name).errors).forEach(function(key,index) {
        if (key == validation.type && index === 0) {
          isFirst = true;
        }
      });
    }
    return isFirst && fc.get(name).hasError(validation.type) && (ngForm.submitted || fc.get(name).touched);
  }

  static showErrorUntouched(fc: FormGroup, ngForm:any, validation:any, name:any) {
    let isFirst = false;
    if(fc.get(name).errors){
      Object.keys(fc.get(name).errors).forEach(function(key,index) {
        if (key == validation.type && index === 0) {
          isFirst = true;
        }
      });
    }
    return isFirst && fc.get(name).hasError(validation.type) && ngForm.submitted;
  }

}
