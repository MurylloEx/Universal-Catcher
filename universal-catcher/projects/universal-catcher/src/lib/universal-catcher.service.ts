import { Injectable } from '@angular/core';
import { UniversalHandler } from './universal-handler';

@Injectable({
  providedIn: 'root'
})
export class UniversalCatcherService {


  set setErrorCatcher(catcherCallback){
    UniversalHandler.errorCatcher = catcherCallback;
  }

  public runCatcher(ngError, ucError){
    if (UniversalHandler.errorCatcher){
      UniversalHandler.runCatcher(ngError, ucError);
    }
  }

}
